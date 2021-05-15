import React from 'react';
import './card-track-analysis.styles.scss';
//import { AudioContext } from 'standardized-audio-context';

const CardTrackAnalysis = ({ changedCards }) => {
  const handleTrackAnalysis = async (e) => {
    const res = [];
    const resv = [];
    var type = '';
    const fr = new FileReader();
    fr.readAsDataURL(document.getElementById('audio_file').files[0]);
    fr.onload = (e) => {
      var audio = document.createElement('audio');
      audio.src = e.target.result;
      audio.currentTime = 0;
      audio.play();
      /*audio.ontimeupdate = (e) => {
        if (e.target.currentTime > 44.416417 - 10 && !alreadyWorking) {
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
        }

        if (e.target.currentTime > 50) {
          e.target.pause();
          //console.log(res);
        }
      };*/

      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      var analyser = audioCtx.createAnalyser();
      var gainNode = audioCtx.createGain();
      var filter = audioCtx.createBiquadFilter();
      filter.type = 'allpass';

      const source = audioCtx.createMediaElementSource(audio);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      source.connect(analyser);
      analyser.fftSize = 1024;

      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);
      var canvas = document.getElementById('canvas');
      var canvasCtx = canvas.getContext('2d');
      console.log(canvasCtx);
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      var maybePeak = null;
      var num = 0;
      var nummin = 0;

      const draw = () => {
        if (!audio.paused) requestAnimationFrame(draw, canvas);

        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
        var barWidth = WIDTH / 4;
        var barHeight;
        var x = 0;

        for (var i = 0; i < 4; i++) {
          if (i === 0) {
            if (dataArray[0] < 120) {
              type = 'low';
              num = 0;
              nummin++;
              maybePeak = null;
            }

            if (
              dataArray[0] > 240 &&
              type === 'low' &&
              audio.currentTime > 15
            ) {
              num++;
              type = 'high';
              maybePeak = audio.currentTime;
              resv.push(audio.currentTime);
              console.log(audio.currentTime);
            } else {
              if (audio.currentTime > maybePeak && maybePeak) {
                if (dataArray[0] > 240) num++;
                if (num === 200) {
                  if (nummin > 200) resv.push(maybePeak);
                  console.log(
                    'true maybePeak',
                    maybePeak,
                    'before=',
                    nummin,
                    'long=',
                    num
                  );

                  nummin = 0;
                }
              }
            }

            res.push(dataArray[i]);
          }
          barHeight = dataArray[i] * 2;
          canvasCtx.fillStyle =
            'rgb(' + (barHeight / 3 + 100) + ',50,' + (255 - barHeight) + ')';
          canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }

        return false;
      };

      draw();
    };
  };

  return (
    <div className="card-track-analysis">
      <input
        type="file"
        name="audio_file"
        id="audio_file"
        onChange={handleTrackAnalysis}
      ></input>
      <canvas id="canvas" width="1200" height="600"></canvas>

      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`} />
    </div>
  );
};

export default CardTrackAnalysis;
