var tower, towerImage;
var door, doorImage , doorsGroup;
var climber,climberImage,climbersGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play";
var spookySound;

function preload(){

  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav")

}

function setup(){

  createCanvas(600,600);
  
  tower = createSprite(300,300,300,300);
  tower.addImage(towerImage);
  
  
  ghost = createSprite(300,300,1,1);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw(){

  background("black");
  if(gameState==="play"){
   spookySound.play(); 
      if(keyDown("space")){

        ghost.velocityY = -12;
        

      }

      ghost.velocityY = ghost.velocityY + 0.8;

      if(keyDown("right")){

          ghost.x = ghost.x + 3;
      }


      if(keyDown("left")){

          ghost.x = ghost.x - 3;
      }


      tower.velocityY = -6;

      if(tower.y < 0){                   

        tower.y = tower.height/2;
         }
      if (climbersGroup.isTouching(ghost)){
        ghost.velocityY=0;
      }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end"
  }
    
    
  spawnDoor();
    
  }
  
  
  drawSprites();
if(gameState==="end"){
fill("yellow")
  textSize(30)
  text("Game Over",300,300)
  
}

}
function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,400))
    door.lifetime=800;
    doorsGroup.add(door);
    ghost.depth=door.depth;
    ghost.depth +=1;
    
    
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x
    climber.velocityY=1
    climber.lifetime=800;
    climbersGroup.add(climber);
    invisibleBlock=createSprite(200,15,climber.width,2)
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    invisibleBlockGroup.add(invisibleBlock);

  }
  
  
  
  
  
  
}