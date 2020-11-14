var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameOver, gameOverImg;
var restart, restartImg;

function preload() {
towerImg = loadImage("tower.png");
doorImg = loadImage("door.png");
climberImg = loadImage("climber.png");
ghostImg = loadImage("ghost-standing.png");
restartImg = loadImage("restart.jpg");
 gameOverImg = loadImage("download.jpg"); 
//spookySound = loadSound("spooky.wav");
}

function setup() {
createCanvas(600,600);  
  
tower = createSprite(300,300,10,10);  
tower.addImage(towerImg);
tower.velocityY = 2;
  
ghost = createSprite(300,300,20,20);
ghost.addImage(ghostImg);
ghost.scale = 0.4;
  
restart = createSprite(300,320,10,10);
restart.addImage(restartImg);
restart.visible = false;  
restart.scale = 0.4;  

gameOver = createSprite(300,300,10,10);
gameOver.addImage(gameOverImg);
gameOver.visible = false;  
gameOver.scale = 0.4;  
  
 doorsGroup = new Group();
 climbersGroup = new Group(); 
 invisibleBlocksGroup = new Group();  
  
}

function draw() {
  background(180);
  
  if(gameState === PLAY) {
  if(tower.y > 400) {
  tower.y = 300
}
  
if(keyDown("space")) {
  ghost.velocityY = -10;
}  
  ghost.velocityY = ghost.velocityY + 1;
  
 if(ghost.isTouching(invisibleBlocksGroup) || ghost.y>600) {
   gameState = END;
 } 
  
  if(keyDown("left")) {
    ghost.x = ghost.x -3;
  }
  
  if(keyDown("right")) {
    ghost.x = ghost.x +3;
  }
  
  doors();
  
  drawSprites();
  }
  
  if(gameState === END) {
   textSize(30);
    fill("black");
    text("Game Over",300,300);
    }
  
}

function doors() {
  if(frameCount % 600 === 0) {   
  door = createSprite(300,0,20,20);
  door.velocityY = 1;
  door.addImage(doorImg);
  doorsGroup.add(door);
  door.x = Math.round(random(120,400));
    
  climber = createSprite(300,65,20,20);
  climber.velocityY = 1;
  climber.addImage(climberImg);
  climbersGroup.add(climber);  
  climber.x = door.x;
  
  invisibleBlock = createSprite(300,80,100,3);
  invisibleBlock.velocityY = 1;
  invisibleBlocksGroup.add(invisibleBlock);  
  invisibleBlock.x = door.x;
  invisibleBlock.shapeColor = "red";  
  
 }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  doorsGroup.destroyEach();
  invisibleBlocksGroup.destroyEach();
  climbersGroup.destroyEach();
}


