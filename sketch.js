var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground;
var leftWall,rightWall,bottomWall;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.6, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 30 , {isStatic:true} );
	 World.add(world, ground);
	 
	var positionX = width/2-150;
	leftWall = Bodies.rectangle(positionX,610,20,100,{isStatic:true});
	World.add(world, leftWall);

	rightWall = Bodies.rectangle(positionX + 250, 610,20,100,{isStatic:true});
	World.add(world,rightWall);

	bottomWall = Bodies.rectangle(width/2 - 25,650,230,20,{isStatic:true});
	World.add(world,bottomWall)

	
	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  Engine.update(engine);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 
  //groundSprite.x = ground.position.x;
  //groundSprite.y = ground.position.y;
  //rect(ground.position.x,ground.position.y,800,20)
  fill("red");
  noStroke();
  rect(leftWall.position.x,leftWall.position.y,20,100);
  rect(rightWall.position.x,rightWall.position.y,20,100);
  rect(bottomWall.position.x,bottomWall.position.y,230,20);
  drawSprites();
  
 
}

function keyPressed() {
	

	
	if (keyCode === LEFT_ARROW) {

		helicopterSprite.x=helicopterSprite.x-20;
		if(packageBody.position.y === helicopterSprite.y){    
			translation={x:-20,y:0}
			Matter.Body.translate(packageBody, translation)
			
		}
	
	
	  } else if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x=helicopterSprite.x+20;
		if(packageBody.position.y === helicopterSprite.y){
			translation={x:20,y:0}
			Matter.Body.translate(packageBody, translation)
		}
	  }
	  else if (keyCode === DOWN_ARROW) {
		  if((helicopterSprite.x>leftWall.position.x +10) && (helicopterSprite.x<rightWall.position.x-10))
		Matter.Body.setStatic(packageBody,false);
		
	  }
	
}



