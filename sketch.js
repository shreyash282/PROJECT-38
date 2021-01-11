
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var bg, bgImage;
var ground;
const PLAY = 1;
const END = 2;
var gameState = PLAY;
var touched = 0;
var sizeScore = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(400, 200, 20, 20);
  bg.addImage(bgImage);
  bg.velocityX = -4;
  bg.scale = 800/1003;
  bg.x = 400;
  
  
  monkey = createSprite(100, 320, 200, 200);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  console.log(bg.width);
}


function draw() {
  background("black");
  monkey.x =camera.position.x-150
  
  if (gameState === PLAY){
    monkey.collide(ground);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && monkey.velocityY === 0){
      monkey.velocityY = -12;
    }
  
    if (bg.x <= camera.position.x-100){
      bg.x = camera.position.x;
    }
    monkey.velocityY += 0.6;
    
    if (foodGroup.isTouching(monkey)){
      score += 2;
      sizeScore += 1;
      foodGroup.destroyEach();
    }
  
  
    spawnBanana();
    spawnObstacles();
    monkeySize();
    drawSprites();
    drawScore();
  
  } else if (gameState === END){
    obstacleGroup.destroyEach();
    monkey.destroy();
    foodGroup.destroyEach();
    bg.destroy();
    stroke("yellow")
    textSize(33);
    text("You lose!!", 120, 190);
  }
  
}

function spawnBanana() {
  if (frameCount%80 === 0){
    banana = createSprite(400, 70, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.y = Math.round(random(120, 200))
    banana.lifetime = 400/7;
    banana.velocityX = -7;
    
    foodGroup.add(banana);
  }
  
}

function spawnObstacles(){
  
  if (frameCount%300 === 0){
    obstacle = createSprite(400, 330, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 400/7
    
    obstacleGroup.add(obstacle);
  }
}

function drawScore(){
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 270, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  
}

function monkeySize(){
  if (touched === 0 ){
    // after every 10 points scored, the monkeys size increases by 10%
    monkey.scale = 0.1 + sizeScore/100;
    
    if (obstacleGroup.isTouching(monkey)){
      touched++;
      sizeScore = 0;
      obstacleGroup.destroyEach();
    }
  }
  
  if (touched === 1){
    monkey.scale = 0.1;
    monkey.scale = 0.1 + sizeScore/100;
    if (obstacleGroup.isTouching(monkey)){
      touched++;      
    }
  }
  if (touched === 2){
    gameState = END;
    
  }
}

 