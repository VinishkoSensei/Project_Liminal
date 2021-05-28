import React from 'react';
import './card-track-analysis.styles.scss';
import * as mm from 'music-metadata-browser';
//import { AudioContext } from 'standardized-audio-context';

const CardTrackAnalysis = ({ changedCards }) => {
  const average = (list) => {
    return list ? list.reduce((prev, curr) => prev + curr, 0) / list.length : 0;
  };

  const handleTrackAnalysis = async (e) => {
    const res = [];
    const resv = [];
    var type = '';
    const fr = new FileReader();
    fr.readAsDataURL(document.getElementById('audio_file').files[0]);
    fr.onloadend = (e) => {
      mm.parseBlob(document.getElementById('audio_file').files[0]).then(
        (metadata) => {
          var duration = metadata.format.duration;
          console.log(duration);
          var audio = document.createElement('audio');
          audio.src = e.target.result;
          audio.currentTime = 0;
          audio.playbackRate = 4.0;
          audio.play();
          var widthp = 0;
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
        }
*/
            if (
              e.target.currentTime >= duration ||
              e.target.currentTime > 300
            ) {
              e.target.pause();
              console.log(resv);
            }

            var canvas = document.getElementById('canvas');

            if (e.target.currentTime < duration) {
              widthp = (canvas.width * e.target.currentTime) / duration;
            }
          };

          audio.onended = (e) => {
            console.log(resv);
          };

          var audioCtx = new (window.AudioContext ||
            window.webkitAudioContext)();
          var analyser = audioCtx.createAnalyser();
          var gainNode = audioCtx.createGain();
          var filter = audioCtx.createBiquadFilter();
          filter.type = 'allpass';
          //filter.frequency.value = 20000;

          const source = audioCtx.createMediaElementSource(audio);

          source.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          source.connect(analyser);
          analyser.fftSize = 1024;
          analyser.smoothingTimeConstant = 0.9;

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
          var summin = [];
          var summax = [];

          const draw = () => {
            if (!audio.paused) requestAnimationFrame(draw, canvas);

            analyser.getByteFrequencyData(dataArray);
            canvasCtx.fillStyle = 'rgb(0, 0, 0)';
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            var barWidth = WIDTH / 255;
            var barHeight;
            var x = 0;
            var sum = 0;

            for (var j = 416; j < 420; j++) {
              sum += dataArray[j];
            }

            for (var i = 0; i < dataArray.length; i++) {
              if (i === 0) {
                if (dataArray[0] < 120) {
                  type = 'low';
                  num = 0;
                  nummin++;
                  summin.push(sum);
                  maybePeak = null;
                }

                if (
                  dataArray[0] > 240 &&
                  type === 'low' &&
                  audio.currentTime > 15
                ) {
                  num++;
                  summax.push(sum);
                  type = 'high';
                  maybePeak = audio.currentTime;
                } else {
                  if (audio.currentTime > maybePeak && maybePeak) {
                    if (dataArray[0] > 240) num++;
                    if (num === 200) {
                      console.log(average(summax));
                      console.log(average(summin));
                      console.log(nummin);
                      console.log(average(summax) / average(summin) > 15);
                      if (
                        nummin >= 200 &&
                        average(summax) / average(summin) > 20
                      ) {
                        console.log('Pushing', maybePeak);
                        resv.push(maybePeak);
                      }
                      console.log(
                        'true maybePeak',
                        maybePeak,
                        'before=',
                        nummin,
                        'long=',
                        num,
                        'beforeavg=',
                        average(summin),
                        'nowavg=',
                        average(summax)
                      );
                      summin = [];
                      summax = [];
                      nummin = 0;
                    }
                  }
                }
                res.push(dataArray[i]);
              }
              barHeight = dataArray[i] * 2;
              canvasCtx.fillStyle =
                'rgb(' +
                (barHeight / 3 + 100) +
                ',50,' +
                (255 - barHeight) +
                ')';
              canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

              x += barWidth + 1;
            }

            canvasCtx.fillStyle = 'rgb(0,0,255)';
            canvasCtx.fillRect(0, 0, widthp, 20);

            canvasCtx.fillStyle = 'rgb(100,200,200)';

            canvasCtx.fillRect(0, 20, WIDTH, (HEIGHT * sum) / 5 / 255);
            return false;
          };

          draw();
        }
      );
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
