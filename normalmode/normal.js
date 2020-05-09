var canvas=document.getElementById('canvas');

var c=canvas.getContext("2d");


var cw=canvas.width;
var ch=canvas.height;

var gamestart=true;
var gameover=false;
var movedownobstacles=false;
//score
var score=0;
var highscore=0;


var colors=["rgb(50, 219, 240)","rgb(144, 13, 255)","rgb(255, 1, 129)","rgb(250, 225, 0)"];

canvas.addEventListener("click",function() {
  sound();
  ball.up();

});
canvas.addEventListener("ontouchend",function() {
  sound();
  ball.up();

});

//distance b/w two points
function distancebwpoints(x1,y1,x2,y2) {
  var distancex=x2-x1;
  var distancey=y2-y1;
  return Math.sqrt(Math.pow(distancex,2)+Math.pow(distancey,2));

}



//ball
function Ball(x,y,dy,radius,color) {
  this.x=x;
  this.y=y;
  this.dy=dy;
  this.radius=radius;
  this.color=color;
  this.draw=function () {
    c.beginPath();
    c.fillStyle=this.color;
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fill();

  }
  this.update=function () {
      if (this.y+this.radius<ch && gamestart==true) {
        if (movedownobstacles) {
          this.y+=2

        }
        else {
              this.y+=this.dy;

        }
        

       
      }


  }
  this.up=function() {
    if (this.y>ch/2-100 && gamestart==true) {
      this.y-=41;

    }

  }
  this.know=function () {
    if (gamestart==true) {
      if (this.y<ch/2) {
        movedownobstacles=true;

      }
      else {
        movedownobstacles=false;
      }

    }
 }
}
var radius=10;
var ball=new Ball(cw/2,ch-2*radius,1.25,radius,"rgb(50, 219, 240)");

var anglecw=0;
//obstacles
function Obstacles(y,radius,angle) {
  this.x=cw/2;
  this.y=y;
  this.radius=radius;
  this.color1="rgb(50, 219, 240)";
  this.color2="rgb(255, 1, 129)";
  this.color3="rgb(250, 225, 0)";
  this.color4="rgb(144, 13, 255)";
  this.angle=angle;

  this.dy=0;

  //2arc start
  this.draw=function () {
    c.beginPath();
    c.lineWidth=10;
    c.strokeStyle=this.color1;
    c.arc(0,0,this.radius,0,Math.PI*1,false);
    c.stroke();
    c.beginPath();
    c.strokeStyle=this.color2;
    c.arc(0,0,this.radius,Math.PI*1,Math.PI*2,false);
    c.stroke();


  }
 this.update=function () {
   this.z=this.y+this.dy;

     c.save();
     c.translate(this.x,this.y+this.dy);
     c.rotate(this.angle);
     this.draw()
     c.restore();



  this.angle+=1*(Math.PI/180);
  if (movedownobstacles) {
   this.dy+=1;
  }


}
//2 arc end
//2 arc different color start
this.draw1=function () {
  c.beginPath();
  c.lineWidth=10;
  c.strokeStyle=this.color1;
  c.arc(0,0,this.radius,0,Math.PI*1,false);
  c.stroke();
  c.beginPath();
  c.strokeStyle=this.color4;
  c.arc(0,0,this.radius,Math.PI*1,Math.PI*2,false);
  c.stroke();


}
this.update1=function () {
 this.z=this.y+this.dy;

   c.save();
   c.translate(this.x,this.y+this.dy);
   c.rotate(this.angle);
   this.draw1()
   c.restore();




this.angle-=1*(Math.PI/180);
if (movedownobstacles) {
 this.dy+=1;
}
}
//2nd arc different color end
//3 arc start
this.draw2=function () {
  c.beginPath();
  c.lineWidth=10;
  c.strokeStyle=this.color1;
  c.arc(0,0,this.radius,0,Math.PI*0.67,false);
  c.stroke();
  c.beginPath();
  c.strokeStyle=this.color2;
  c.arc(0,0,this.radius,Math.PI*0.67,Math.PI*1.34,false);
  c.stroke();
  c.beginPath();
  c.strokeStyle=this.color4;
  c.arc(0,0,this.radius,Math.PI*1.34,Math.PI*2,false);
  c.stroke();


}
this.update2=function () {
 this.z=this.y+this.dy;

   c.save();
   c.translate(this.x,this.y+this.dy);
   c.rotate(this.angle);
   this.draw2()
   c.restore();




this.angle+=1*(Math.PI/180);
if (movedownobstacles) {
 this.dy+=1;
}
}
//3 arc end

}
var obstacle=new Obstacles(400,60,0);
var obstacle1=new Obstacles(150,60,0);
var obstacle2=new Obstacles(-100,60,0);
var obstacle3=new Obstacles(-350,60,0);
var obstacle4=new Obstacles(-600,60,0.25);
//2 rings combined
var obstacle5=new Obstacles(-850,60,0);
var obstacle6=new Obstacles(-850,75,0.35);
//3 rings combined
var obstacle7=new Obstacles(-1150,60,0);
var obstacle8=new Obstacles(-1150,75,0.25);
var obstacle9=new Obstacles(-1150,90,0.5);

//color checker
var imgdata;

function colorcheck () {
 c.save();
 imgdata=c.getImageData(ball.x-10,ball.y-10,16,16);

 for (var i = 0; i < imgdata.data.length; i+=4) {
   if (imgdata.data[0+i]===255 || imgdata.data[0+i]===144 || imgdata.data[0+i]===250) {
     gameover=true;
     gamestart=false;
     movedownobstacles=false;


   }
 }

  c.restore();

}
//game over display

function gameoverdisplay() {
     if (gameover) {
       gameoversound();
       c.save();
       c.beginPath();
       c.fillStyle="rgba(64, 64, 64,0.8)";
       c.fillRect(0,0,500,600);
       c.beginPath();
       c.font="60px Noto Sans KR";
       c.fillStyle="rgb(204, 204, 204)"
       c.fillText("GAME",50,200);
       c.fillText("OVER",240,200);
       c.font="40px Noto Sans KR";
       scorerecord.sort();
       highscore=scorerecord[scorerecord.length-1];
       c.fillText("SCORE:"+score,100,275);
       c.fillText("HIGHSCORE:"+highscore,100,350);
       c.fill();
       c.restore();
       document.getElementById("try").style.visibility="visible";




     }

}

// draw
function draw() {
  c.fillStyle ="rgb(39, 39, 39)";
  c.fillRect(0, 0,cw,ch);
  obstacle.update();
  obstacle1.update1();
  obstacle2.update();
  obstacle3.update1();
  obstacle4.update2();
  obstacle5.update2();
  obstacle6.update2();
  obstacle7.update2();
  obstacle8.update2();
  obstacle9.update2();


  colorcheck();
  ball.draw();



}

//update
function update() {
  ball.update();
  ball.know();
  scoreupdtae();
  scoredisplay();
   storescore();
  gameoverdisplay();







}

  //scoredisplay in canvas
function scoredisplay() {
  c.save()
  c.beginPath()
  c.font="23px Noto Sans KR";
  c.fillStyle="rgb(204, 204, 204)"
  c.fillText("score:"+score,0,18);
  c.restore()




}

//loop
function loop() {

  draw();
  update();


  requestAnimationFrame(loop);

}

loop();

//score
function scoreupdtae() {
  if (distancebwpoints(ball.x,ball.y,obstacle.x,obstacle.z)<15) {
    score=1;

  }
  if (distancebwpoints(ball.x,ball.y,obstacle1.x,obstacle1.z)<15) {
    score=2;

  }
  if (distancebwpoints(ball.x,ball.y,obstacle2.x,obstacle2.z)<15) {
    score=3;

  }
  if (distancebwpoints(ball.x,ball.y,obstacle3.x,obstacle3.z)<15) {
    score=4;

  }
  if (distancebwpoints(ball.x,ball.y,obstacle4.x,obstacle4.z)<15) {
    score=5;

  }
  // redesign
  if (distancebwpoints(ball.x,ball.y,obstacle5.x,obstacle5.z)<15) {
    score=6;

  }
  if (distancebwpoints(ball.x,ball.y,obstacle7.x,obstacle7.z)<15) {
    score=7;
  }
  if (distancebwpoints(ball.x,ball.y,obstacle7.x,obstacle7.z)>200 && obstacle7.z>ball.y) {
    gameover=true;
    gamestart=false;
    movedownobstacles=false;


  }

}


//background score

var myAudio = new Audio('background.mp3');
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
if (gamestart) {
  myAudio.play();


}
//jump sound
var jump=new Audio("Boing-sound.mp3");
function sound() {
  if (gamestart) {
    jump.play();

  }


}
//gameover sound
var beep=new Audio("gameover.mp3")
function gameoversound(){
  beep.play();
}

//storescore

var scorerecord=[];

scorerecord=JSON.parse(localStorage.getItem("score1"));

 if (scorerecord!=null) {
   scorerecord.sort();
   highscore=scorerecord[scorerecord.length-1];

}

function storescore() {
  if (gameover) {
    if (scorerecord==null) {
          scorerecord=[];
          scorerecord[scorerecord.length]=score;
          localStorage.setItem("score1",JSON.stringify(scorerecord));
      }
        else{
            scorerecord[scorerecord.length]=score;
            localStorage.setItem("score1",JSON.stringify(scorerecord));
      }
      storescore=function () { }

 }

}

