import React, { useState, useRef } from 'react';
import FormFileInput from '../forminputs/formfileinput/formfileinput.component';
import './card-track-analysis.styles.scss';
import * as mm from 'music-metadata-browser';

const CardTrackAnalysis = () => {
  const [suggestedPoints, setSuggestedPoints] = useState([]);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

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

  const createAudio = (src, currentTime, playbackRate) => {
    const audio = audioRef.current;
    audio.src = src;
    audio.currentTime = currentTime;
    audio.playbackRate = playbackRate;
    return audio;
  };

  const createAudioContextAndGetAnalyser = (audio) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.9;
    source.connect(analyser);
    return analyser;
  };

  const fileSelectAndAnalyseHandler = (e) => {
    const file = e.target.files[0];
    var type = '';
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onloadend = (e) => {
      mm.parseBlob(file).then((metadata) => {
        const audio = createAudio(e.target.result, 0, 4.0);
        audio.play();
        audio.ontimeupdate = (e) => {
          /*if (e.target.currentTime > 44.416417 - 10 && !alreadyWorking) {
          alreadyWorking = true;
          var fadeout = setInterval(function () {
            if (audio.volume > 0.35) {
              audio.volume -= 0.05;
            } else {
              clearInterval(fadeout);
            }
          }, interval);
        }

        if (e.target.currentTime >= 44.241417) {
          audio.volume = 1.0;
        }*/
        };
        /*audio.onended = (e) => {
          console.log(suggestedPoints);
        };*/

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
                      setSuggestedPoints([...suggestedPoints, maybePeak]);
                    }
                    summin = [];
                    summax = [];
                    nummin = 0;
                  }
                }
              }
            }
            const barHeight = elem * 2;
            fillCanvas({
              canvasCtx: canvasCtx,
              color: {
                red: barHeight / 3 + 100,
                green: 50,
                blue: 255 - barHeight,
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
              red: 0,
              green: 0,
              blue: 255,
            },
            rectangle: {
              x: 0,
              y: 0,
              width:
                (canvas.width * audio.currentTime) / metadata.format.duration,
              height: 20,
            },
          });

          fillCanvas({
            canvasCtx: canvasCtx,
            color: {
              red: 100,
              green: 200,
              blue: 200,
            },
            rectangle: {
              x: 0,
              y: 20,
              width: canvas.width,
              height: (canvas.height * sum) / 5 / 255,
            },
          });
          return false;
        };

        draw();
      });
    };
  };

  return (
    <div className="card-track-analysis">
      {/*<input type="file" name="audio_file" id="audio_file"></input>*/}
      <audio ref={audioRef} />
      <FormFileInput handleChange={fileSelectAndAnalyseHandler} />
      <canvas id="canvas" ref={canvasRef} width="1200" height="600"></canvas>
      {suggestedPoints.map((point, index) => (
        <div key={index}>{point}</div>
      ))}
    </div>
  );
};

export default CardTrackAnalysis;
