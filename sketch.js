//Game States
var PLAY=1;
var END=0;
var START=2;
var gameState=2;

var fruitblock
var knife;
var cutfruit;
var newfont
var knifeImage ;
var gameover;
var backgroundimg;
var scorefruit
var orangeimg,appleimg,pearimg,bananaimg,bomb1img,bomb2img;
var og,ag,pg,bg,b1g,b2g;
var replay,replayimg;
var b1s,b2s,os,as,ps,bs,starts;

function preload(){
  newfont = loadFont("gang of three.ttf");
  knifeImage = loadImage("knife.png");
  backgroundimg = loadImage("background.png");
  scorefruit = loadImage("cut fruit.png");
  orangeimg = loadImage("fruit1.png");
  appleimg = loadImage("fruit2.png");
  pearimg = loadImage("fruit3.png");
  bananaimg = loadImage("fruit4.png");
  bomb1img = loadImage("bomb1.png");
  bomb2img = loadImage("bomb2.png");
  replayimg = loadImage("replay.png");
  playimg = loadImage("play.png");
  b1s = loadSound("bomb1.wav");
  b2s = loadSound("bomb2.wav");
  os = loadSound("orange.wav");
  as = loadSound("apple.wav");
  ps = loadSound("pear.wav");
  bs = loadSound("banana.wav");
  starts = loadSound("start.wav");
  logo = loadImage("logo.png");
  gameover = loadImage("gameover.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cutfruit = createSprite(70,50);
  cutfruit.addImage(scorefruit);
  cutfruit.scale = 0.5;
  cutfruit.depth = 10;
  cutfruit.setCollider("rectangle",150,20,500,180);
  
  fruitblock = createSprite(width/2,10,width,5);
  fruitblock.visible = false;
  
  
  replay = createSprite(width/2, height/2 + 70);
  replay.addImage(replayimg);
  replay.scale = 0.3;
  replay.setCollider("circle",0,0,190)
  replay.visible = false;
  
  play = createSprite(width/2, height/2 + 70);
  play.addImage(playimg);
  play.scale = 1.2;
  play.setCollider("circle",0,0,67)
  play.visible = true;

  //creating sword
   knife=createSprite(0,0,1,1);
   knife.scale=0.7;
  knife.depth = 2;
  //set collider for sword
  knife.setCollider("rectangle",-10,20,0.1,0.1,0);
  
  score=0;
  //create fruit and monster Group variable here
  og = new Group();
  ag = new Group();
  pg = new Group();
  bg = new Group();
  b1g = new Group();
  b2g = new Group();
}

function draw() {
  background(backgroundimg);
  selectfruit = Math.round(random(1,6));
  
  console.log("Fruit no",selectfruit);
  console.log(" By Balamurugan");
  
  if(mouseIsPressed){
  // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    stroke("silver");
    strokeWeight("7")
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  if(gameState===PLAY){
    knife.visible = true;
    replay.visible = false;
    cutfruit.visible = true;
    //calling fruit and monster function
   if (World.frameCount % (20-score) == 0 && score<20){
   if (selectfruit == 1) {
   bomb1();
   }
   if (selectfruit == 2) {
   bomb2();
   }
   if (selectfruit == 3) {
   orange();
   } 
   if (selectfruit == 4) {
   apple();
   }
   if (selectfruit == 5) {
   pear();
   }
   if (selectfruit == 6) {
   banana();
   }
  }
  if(score > 19 && World.frameCount/1 == World.frameCount ){
    if (selectfruit == 1) {
      bomb1();
      }
      if (selectfruit == 2) {
      bomb2();
      }
      if (selectfruit == 3) {
      orange();
      } 
      if (selectfruit == 4) {
      apple();
      }
      if (selectfruit == 5) {
      pear();
      }
      if (selectfruit == 6) {
      banana();
      }
  }
  fruitblock.overlap(b1g, function(collector, collected) {
    collected.velocityY = 17+score;
  });
    
  fruitblock.overlap(b2g, function(collector, collected) {
    collected.velocityY = 17+score;
  });
  fruitblock.overlap(og, function(collector, collected) {
    collected.velocityY = 17+score;
  });
  fruitblock.overlap(ag, function(collector, collected) {
    collected.velocityY = 17+score;
  });
  fruitblock.overlap(pg, function(collector, collected) {
    collected.velocityY = 17+score;
  });
  fruitblock.overlap(bg, function(collector, collected) {
    collected.velocityY = 17+score;
  });
    // Increase score if knife touching fruit
   if(knife.isTouching(b1g) && mouseIsPressed){
     b1s.play();
     b1g.destroyEach();
     gameState = END;
   }
    if(knife.isTouching(b2g) && mouseIsPressed){
      b2s.play();
     b2g.destroyEach();
      gameState = END;
   }
   knife.overlap(og, function(collector, collected) {
    if(mouseIsPressed){
    os.play();
    score = score+1;
    collected.remove();
    }
  });
  knife.overlap(ag, function(collector, collected) {
    if(mouseIsPressed){
    as.play();
    score = score+1;
    collected.remove();
    }
  });
    knife.overlap(pg, function(collector, collected) {
    if(mouseIsPressed){
    ps.play();
    score = score+1;
    collected.remove();
    }
  });
  knife.overlap(bg, function(collector, collected) {
    if(mouseIsPressed){
    bs.play();
    score = score+1;
    collected.remove();
    }
  });
  }
  if(gameState === END){
    replay.visible = true;
    knife.visible = false;
    b1g.destroyEach();
    b2g.destroyEach();
    og.destroyEach();
    ag.destroyEach();
    pg.destroyEach();
    bg.destroyEach();
    if(mouseIsPressed && knife.isTouching(replay)){
      starts.play();
      score = 0;
      gameState = PLAY;
    }
  }
  if(gameState === START){
     cutfruit.visible = false;
     image(logo,width/2 - 425,25,425,225)
   
     fill("#9c9c9c");
     textSize(170)
     textFont(newfont)
     stroke(50);
     text("Ninja",width/2 +30,230);
  
  if(mouseIsPressed && knife.isTouching(play) ){
    play.visible = false;
    gameState = PLAY;
    starts.play();
  }
  }
  
  drawSprites();
  
  if(gameState===PLAY || gameState===END){
  //Display score
  textSize(60);
  fill("#f2a007");
  textFont(newfont)
  strokeWeight("7")
  stroke(5);
  depth = -5
  text(score,110,60);
  }
  if(gameState===END){
  image(gameover,width/2 - 420,70,855,175)
  }
}
function bomb1(){
  var bomb1 = createSprite(Math.round(random(10,width-10)),height);
  bomb1.velocityY = -17-score;
  if(bomb1.x < width/2){
    bomb1.velocityX = 5
  }
  if(bomb1.x > width/2){
    bomb1.velocityX = -5
  }
  bomb1.addImage(bomb1img);
  bomb1.lifetime = 500;
  bomb1.depth = 1;
  bomb1.scale = 0.9;
  bomb1.setCollider("rectangle",-25,25,80,120,45)
  b1g.add(bomb1);
}
function bomb2(){
  var bomb2 = createSprite(Math. round(random(10,width-10)),height);
  bomb2.addImage(bomb2img);
  bomb2.velocityY = -17-score
  if(bomb2.x < width/2){
    bomb2.velocityX = 5
  }
  if(bomb2.x > width/2){
    bomb2.velocityX = -5
  }
  bomb2.lifetime = 500;
  bomb2.setCollider("circle",-25,40,70,);
  bomb2.depth = 1;
  bomb2.scale = 0.7;
  b2g.add(bomb2);
}
function orange(){
  var orange = createSprite(Math. round(random(10,width-10)),height);
  orange.addImage(orangeimg);
  orange.setCollider("circle",-10,0,85)
  orange.velocityY = -17-score;
  if(orange.x < width/2){
    orange.velocityX = 5
  }
  if(orange.x > width/2){
    orange.velocityX = -5
  }
  orange.lifetime = 200;
  orange.depth = 1;
  orange.scale = 0.5
  og.add(orange);
}
function apple(){
  var apple = createSprite(Math. round(random(10,width-10)),height);
  apple.addImage(appleimg);
  apple.setCollider("circle",5,15,95)
  apple.velocityY = -17-score;
  
  if(apple.x <  width/2){
    apple.velocityX = 5
  }
  if(apple.x > width/2){
    apple.velocityX = -5
  }
  apple.lifetime = 200;
  apple.scale = 0.5;
  apple.depth = 1;
  ag.add(apple);
}
function pear(){
  var pear = createSprite(Math. round(random(10,width-10)),height);
  pear.addImage(pearimg);
  pear.setCollider("rectangle",0,15,180,220)
  pear.velocityY = -17-score;
  
  if(pear.x < width/2){
    pear.velocityX = 5
  }
  if(pear.x > width/2){
    pear.velocityX = -5
  }
  pear.lifetime = 200;
  pear.depth = 1;
  pear.scale = 0.5
  pg.add(pear);
}
function banana(){
  var banana = createSprite(Math. round(random(10,width-10)),height);
  banana.addImage(bananaimg);
  banana.velocityY = -17-score;
  
  if(banana.x < width/2){
    banana.velocityX = 5
  }
  if(banana.x > width/2){
    banana.velocityX = -5
  }
  banana.lifetime = 200;
  banana.depth = 1;
  banana.scale = 0.4;
  bg.add(banana);
}