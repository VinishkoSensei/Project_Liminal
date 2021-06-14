import React, { useEffect, useRef, useCallback } from 'react';
import './track-analysis.styles.scss';
import Switch from '../shared/switch/switch.component';
import * as mm from 'music-metadata-browser';

const TrackAnalysis = ({
  suggestedPoints,
  setSuggestedPoints,
  target,
  setFinishedAnalysing,
  uniqueKey,
}) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const hiddenAudioRef = useRef(null);

  const getAverage = (list) => {
    return list ? list.reduce((prev, curr) => prev + curr, 0) / list.length : 0;
  };

  const fillCanvas = ({
    canvasCtx,
    color: { red, green, blue },
    rectangle: { x, y, width, height },
  }) => {
    canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
    canvasCtx.fillRect(x, y, width, height);
  };

  const clearCanvas = (canvasCtx, canvas) => {
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const createHiddenAudio = (src, currentTime, playbackRate) => {
    const audio = hiddenAudioRef.current;
    audio.src = src;
    audio.currentTime = currentTime;
    audio.playbackRate = playbackRate;
    return audio;
  };

  const createAudio = (src) => {
    const audio = audioRef.current;
    audio.src = src;
    return audio;
  };

  const createAudioContextAndGetAnalyser = useCallback((audio) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.9;
    source.connect(analyser);
    return analyser;
  }, []);

  const handleInputChange = (id) => (event) => {
    const { name, value } = event.target;
    console.log(suggestedPoints);
    setSuggestedPoints(
      suggestedPoints.map((item, ind) =>
        ind === Number(id) ? (item = { ...item, [name]: Number(value) }) : item
      )
    );
  };

  const handleCheckboxChange = (id) => (event) => {
    const { name } = event.target;
    setSuggestedPoints(
      suggestedPoints.map((item, ind) =>
        ind === Number(id) ? (item = { ...item, [name]: !item[name] }) : item
      )
    );
  };

  const previewAudio = (point) => {
    audioRef.current.currentTime = point;
    audioRef.current.play();
  };

  useEffect(() => {
    if (target) {
      const file = target.files[0];
      var type = '';
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onloadend = (e) => {
        mm.parseBlob(file).then((metadata) => {
          const audio = createHiddenAudio(e.target.result, 0, 4.0);
          createAudio(e.target.result);
          audio.play();
          audio.onended = () => {
            setFinishedAnalysing(true);
          };

          const canvas = canvasRef.current;
          const canvasCtx = canvas.getContext('2d');
          const analyser = createAudioContextAndGetAnalyser(audio);
          const bufferLength = analyser.frequencyBinCount;
          const barWidth = canvas.width / 255;

          let dataArray = new Uint8Array(bufferLength);
          let maybePeak = null;
          let num = 0;
          let nummin = 0;
          let summin = [];
          let summax = [];

          const draw = () => {
            clearCanvas(canvasCtx, canvas);
            if (!audio.paused) requestAnimationFrame(draw, canvas);

            let x = 0;

            analyser.getByteFrequencyData(dataArray);
            const sum = dataArray
              .slice(416, 419)
              .reduce((acc, elem) => acc + elem, 0);

            dataArray.forEach((elem, index) => {
              if (index === 0) {
                if (elem < 120) {
                  type = 'low';
                  num = 0;
                  nummin++;
                  summin.push(sum);
                  maybePeak = null;
                }

                if (elem > 240 && type === 'low' && audio.currentTime > 15) {
                  num++;
                  summax.push(sum);
                  type = 'high';
                  maybePeak = audio.currentTime;
                } else {
                  if (audio.currentTime > maybePeak && maybePeak) {
                    if (elem > 240) num++;
                    if (num === 200) {
                      if (
                        nummin >= 200 &&
                        getAverage(summax) / getAverage(summin) > 20
                      ) {
                        console.log('Pushing', maybePeak);
                        setSuggestedPoints((prevState) => [
                          ...prevState,
                          {
                            peak: maybePeak,
                            checked: false,
                            newPeak: maybePeak,
                          },
                        ]);
                      }
                      summin = [];
                      summax = [];
                      nummin = 0;
                    }
                  }
                }
              }
              const barHeight = elem / 2;
              fillCanvas({
                canvasCtx: canvasCtx,
                color: {
                  red: (elem * 2) / 3 + 100,
                  green: 50,
                  blue: 255 - elem,
                },
                rectangle: {
                  x: x,
                  y: canvas.height - barHeight,
                  width: barWidth,
                  height: barHeight,
                },
              });
              x += barWidth + 1;
            });

            fillCanvas({
              canvasCtx: canvasCtx,
              color: {
                red: 255,
                green: 20,
                blue: 147,
              },
              rectangle: {
                x: 0,
                y: 0,
                width:
                  (canvas.width * audio.currentTime) / metadata.format.duration,
                height: 5,
              },
            });

            fillCanvas({
              canvasCtx: canvasCtx,
              color: {
                red: 138,
                green: 43,
                blue: 226,
              },
              rectangle: {
                x: 0,
                y: canvas.height - (canvas.height * sum) / 255,
                width: canvas.width,
                height: canvas.height,
              },
            });
            return false;
          };

          draw();
        });
      };
    }
  }, [
    target,
    setSuggestedPoints,
    setFinishedAnalysing,
    createAudioContextAndGetAnalyser,
  ]);

  return (
    <div key={uniqueKey}>
      <audio ref={hiddenAudioRef} />
      <canvas id="canvas" ref={canvasRef}></canvas>
      <audio className="preview-audio" ref={audioRef} controls />

      <div className="suggested-points-container">
        {suggestedPoints.map((point, index) => (
          <div className="suggested-point" key={index}>
            <input
              placeholder={point.peak}
              name="newPeak"
              value={point.newPeak}
              onChange={handleInputChange(index)}
            />
            <button
              className="switch-button"
              style={{ backgroundImage: `url('/images/play.svg')` }}
              onClick={() => previewAudio(point.newPeak)}
            />
            <Switch
              index={index}
              checked={point.checked}
              handleCheckboxChange={handleCheckboxChange(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackAnalysis;
