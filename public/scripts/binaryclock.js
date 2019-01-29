const canvas = document.getElementById("clockCanvas"),
      ctx = canvas.getContext("2d"),
      circleRadius = 20,
      gridScale = 50;

function drawCircle(x, y, isOn) {
  fill = parseInt(isOn);
  ctx.strokeStyle = "cyan";
  ctx.fillStyle = "cyan";
  ctx.beginPath();
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
  ctx.stroke();
  if (fill) ctx.fill();
}

function convertToBinaryArray(num) {
  const binaryString = parseInt(num, 10).toString(2).padStart(4,'0');
  const binaryArray = [];
  for (let char of binaryString) {
    binaryArray.push(char);
  }
  return binaryArray;
}

function convertToBinaryTimeArray(_timeArray) {
  const binaryTimeArray = _timeArray.reduce((p, c) => {
    const binaryArray = p.concat(convertToBinaryArray(c));
    return binaryArray;
  }, []);
  return binaryTimeArray;
}

function getTimeStringArray() {
  const date = new Date();
  const arr = [date.getHours(), date.getMinutes(), date.getSeconds()];
  return arr.reduce((p, c) => {
    const splitChars = [];
    c.toString()
      .padStart(2, '0')
      .split('')
      .forEach((char) => {
        splitChars.push(char);
      });
    return p.concat(splitChars);
  }, []);
}

function clearDisplay() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateDigitalDisplay(_timeArray) {
  let x = circleRadius;
  const y = 5 * gridScale;
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  for (let i = 0; i < _timeArray.length; i++) {
    if (i % 2 === 0 && i > 0) x += gridScale / 2;
    x += gridScale;
    ctx.fillText(_timeArray[i], x, y);
  }
} 

function updateBinaryDisplay(_binaryTimeArray) {  
  let x = 0;
  let y = 0;
  for (var i = 0; i < _binaryTimeArray.length; i++) {
    if (i % 4 === 0) {
      x += gridScale;
      y = gridScale;
    }
    if (i % 8 === 0) x += gridScale / 2;
    drawCircle(x, y, _binaryTimeArray[i]);
    y += gridScale;
  }
}

function tick() {
  const timeArray = getTimeStringArray();
  const binaryTimeArray = convertToBinaryTimeArray(timeArray);
  clearDisplay();
  updateDigitalDisplay(timeArray);
  updateBinaryDisplay(binaryTimeArray);
}

setInterval(() => tick(), 1000);
