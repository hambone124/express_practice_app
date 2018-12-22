var counter = 1;
var score = new PointText(new Point(50, 90));
score.strokeColor = 'black';
score.fillColor = 'white';
score.shadowColor = 'black';
score.shadowOffset = 3;
score.shadowBlur = 2;
score.fontSize = 70;
score.content = counter;

function updateCounter(){
  counter++;
  score.content = counter;
  score.bringToFront();
}

function spawnNewCircle(origin) {
  var spawn = new Path.Circle(origin.position, 50);
  spawn.fillColor = origin.fillColor;
  spawn.tweenTo({
        position: new Point.random() * view.size,
        fillColor: Color.random()
      }, {
        duration: 500
      });
  spawn.onClick = function(event) {
    spawnNewCircle(this);
    
  }
  updateCounter();
}
  
var initCircle = new Path.Circle(view.center, 50);
initCircle.fillColor = 'white';
initCircle.onClick = function(event) {
  spawnNewCircle(this);
}

// var testCircle = new Path.Circle(50, 50, 50);
// testCircle.fillColor = 'white';
