var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-4,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(4,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-4);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+4);
    }
    drawSprites();
  
}
// to read the x and y positions
function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}
// read the positions of the subjects
function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}
// shows the error if its not able to connect with database..
function showError(){
  console.log("Error in writing to the database");
}
