'use strict';

// Method for drawing game results
window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.moveTo(110, 20);
  ctx.lineTo(320, 30);
  ctx.lineTo(530, 20);
  ctx.lineTo(510, 155);
  ctx.lineTo(530, 290);
  ctx.lineTo(320, 280);
  ctx.lineTo(110, 290);
  ctx.lineTo(120, 155);
  ctx.closePath();
  ctx.stroke();
  ctx.fill('evenodd');

  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.beginPath();
  ctx.moveTo(100, 10);
  ctx.lineTo(310, 20);
  ctx.lineTo(520, 10);
  ctx.lineTo(500, 145);
  ctx.lineTo(520, 280);
  ctx.lineTo(310, 270);
  ctx.lineTo(100, 280);
  ctx.lineTo(110, 145);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Looking for worst result
  function getMaxElement(arr) {

    var max = -1;

    for (var i = 1; i < arr.length; i++) {
      var time = arr[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  }
  // Drawing game histograms
  function drawHistogram(arrTimes, arrNames) {

    var dataHistogram = {
      histogramHeight: 150,
      barWidth: 40,
      indent: 90,
      offset: 15
    };
    var step = dataHistogram.histogramHeight / (getMaxElement(times) - 0);
    var initialX = 150;
    var initialY = 250;

    for (var i = 0; i < arrTimes.length; i++) {
      dataHistogram.barHeight = arrTimes[i] * step;

      ctx.fillStyle = fillBarColor(arrNames[i]);
      ctx.fillRect(initialX, initialY, dataHistogram.barWidth, -dataHistogram.barHeight);

      ctx.fillStyle = '#000';
      ctx.fillText(arrNames[i], initialX, initialY + dataHistogram.offset);
      ctx.fillText(Math.round(arrTimes[i]), initialX, initialY - (dataHistogram.barHeight + dataHistogram.offset));

      initialX += dataHistogram.indent;
    }
  }

  drawHistogram(times, names);

  // Fill player stats in colors
  function fillBarColor(player) {
    var opacity = Math.random().toFixed(2);
    if (player === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + opacity + ')';
    }
  }
};
