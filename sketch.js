var monkey, back, back1, rockGroup, banana, bananaGroup, gameover, jungleImage, monkey_running, stoneImage, bananaImage, gameState, PLAY, END, count,gameoverImage;

var ground, rand, rand1;

function preload() {

  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  stoneImage = loadImage("stone.png");
  bananaImage = loadImage("banana.png");

  jungleImage = loadImage("jungle.jpg");

  stoneImage = loadImage("stone.png");

  bananaImage = loadImage("banana.png");
  
  gameoverImage=loadImage("gameover.png");
}



function setup() {
  createCanvas(400, 400);

  back = createSprite(200, 200, 20, 400);
  back.addImage("backImage", jungleImage)

  monkey = createSprite(70, 340, 50, 50);
  monkey.addAnimation("monkeyImage", monkey_running);
  monkey.scale = 0.1;

  back1 = createSprite(200, 200, 0.1, 400);
  back.addImage("back1Image", jungleImage);

  ground = createSprite(400, 380, 800, 0.1);
  // ground.visible=false;
  ground.scale = 3;
  
  gameover=createSprite(200,200,400,400);
   gameover.addImage("gameoverImage", gameoverImage);
   gameover.scale=4;
  

count=0;

  rockGroup = new  Group();
  bananaGroup = new Group();

  gameState=PLAY = 1;
  END = 0;


}

function draw() {

  background(220);

  //gameState = PLAY;
  monkey.collide(ground);
  ground.velocityX = -6;
  //monkey.debug=true
  // ground.debug=true

  monkey.velocityY = monkey.velocityY + 0.8;

  if (gameState === PLAY) {

   // bananaGroup.setLifetimeEach (5);
    //rockGroup.setLifetimeEach(5);
    rocky();
    bananas();
    gameover.visible=false;

    if (keyDown("space") && monkey.y >= 240) {
      monkey.velocityY = -10;
    }

    back.velocityX = -6;
    back1.velocityX = -6;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (back.x < 0) {
      back.x = back.width / 2;
    }

    if (back1.x < 200) {
      back1.x = 400;
    }

 if (bananaGroup.isTouching(monkey)) {
   count = Math.round(count + 2);
   bananaGroup.destroyEach();
    }
    
    
    switch(count){
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
         break;
      case 30: monkey.scale=0.16;
         break;
      case 40: monkey.scale=0.18;
         break;
      case 50: monkey.scale=0.20;
         break;
      case 60: monkey.scale=0.22;
         break;
        default: break;
    }
      
    
if(monkey.isTouching(rockGroup)&&gameState===PLAY&&count>=10){
    count=count-10 
    }
    
    
    
if(monkey.isTouching(rockGroup)&&count<=10&&gameState===PLAY){
      gameState=END;
    }

  } else if(gameState === END) {
   
  gameover.visible=true;
    
    ground.velocityX = 0;
    monkey.velocityX=0;
    rockGroup.setVelocityXEach(0);
    
    bananaGroup.setVelocityXEach(0);
    
    back.velocityX=0;
    back1.velocityX=0;
    bananaGroup.setLifetimeEach (-1);
    rockGroup.setLifetimeEach(-1);
 
  //gameover.visible=true;
  bananaGroup.destroyEach();
   rockGroup.destroyEach();
    
  
  if(mousePressedOver(gameover)){
    gameState= PLAY;
     count=0;
    
  }
  
  }
  drawSprites();
 text("Score: "+ count, 250, 100); 
}


function rocky() {

  var rand = Math.round(random(130, 180));
  if (frameCount % rand === 0) {

    rock = createSprite(400, 360, 20, 20);
    rock.addImage("stoneImage", stoneImage);
    rock.scale = 0.09;
    rockGroup.debug = true;
    rock.setCollider("rectangle", 0, 0, 20, 20, 0);
    rock.velocityX = -6;

    rock.lifetime = 70;

    rockGroup.add(rock);

  }
}

function bananas() {


  if (frameCount % 130 === 0) {

    var rand1 = Math.round(random(250, 320));

    banana = createSprite(400, rand1, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.05;

    banana.velocityX = -6;

    banana.lifetime = 70;

    bananaGroup.add(banana);

  }
}
