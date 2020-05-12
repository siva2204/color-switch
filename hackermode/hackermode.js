var canvas=document.getElementById('canvas');
var c=canvas.getContext("2d");
var cw=canvas.width;
var ch=canvas.height;

var gamestart=true;
var gameover=false;
var movedownobstacles=false;
var gamepause=false;

//score
var score=0;
var highscore=0;
//1.blue 2.violet 3.pink 4.yellow
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



//ball--------------------------------------------------------------------------
function Ball(x,y,radius,color) {
  this.x=x;
  this.y=y;
  this.dy=1.5;
  this.dy1=2;
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
          this.y+=this.dy1;

        }
        else {
              this.y+=this.dy;

        }

      }


  }
  this.up=function() {
    if (this.y>ch/2-100 && gamestart==true) {
      this.y-=50;

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
var ball=new Ball(cw/2,ch-radius-3,radius,colors[0]);

//1.blue 2.violet 3.pink 4.yellow
//var colors=["rgb(50, 219, 240)","rgb(144, 13, 255)","rgb(255, 1, 129)","rgb(250, 225, 0)"];

//obstacles
function Obstacles(x,y,radius,angle,direction,lineWidth,speed) {
  this.x=x;
  this.y=y;
  this.radius=radius;
  this.color1="rgb(50, 219, 240)";//blue
  this.color2="rgb(255, 1, 129)";//pink
  this.color3="rgb(250, 225, 0)";//yellow
  this.color4="rgb(144, 13, 255)";//violet
  this.angle=angle;
  this.dy=0;
  this.direction=direction;
  this.lineWidth=lineWidth;
  this.speed=speed;
  //1
  this.draw0=function () {
    c.save()
    c.beginPath();
    c.lineWidth=this.lineWidth;
    c.strokeStyle=this.color1;
    c.arc(0,0,this.radius,0,Math.PI*0.5,false);
    c.stroke();
    c.beginPath();
    c.strokeStyle=this.color2;
    c.arc(0,0,this.radius,Math.PI*0.5,Math.PI*1,false);
    c.stroke();
    c.beginPath();
    c.strokeStyle=this.color3;
    c.arc(0,0,this.radius,Math.PI*1,Math.PI*1.5,false);
    c.stroke();
    c.beginPath();
    c.strokeStyle=this.color4;
    c.arc(0,0,this.radius,Math.PI*1.5,Math.PI*2,false);
    c.stroke();
    c.restore();


  }
  this.update0=function () {
    this.z=this.y+this.dy;

      c.save();
      c.translate(this.x,this.y+this.dy);
      c.rotate(this.angle);
      this.draw0();
      c.restore();

   if (this.direction==cw) {
      this.angle+=this.speed*(Math.PI/180);

   }
   else {
    this.angle-=this.speed*(Math.PI/180);
   }


   if (movedownobstacles) {
    this.dy+=1;
   }


 }


}
var obstacle0=new Obstacles(cw/2,400,70,0,cw,10,1);

var obstacle1=new Obstacles(cw/2,150,70,0,c,10,1.5);

var obstacle2=new Obstacles(cw/2,-100,70,0,cw,10,1.2);

var obstacle3=new Obstacles(cw/2,-250,70,Math.PI*1,cw,10,1.2);

var obstacle4=new Obstacles(cw/2,-400,70,0,cw,10,1.2);

var obstacle5=new Obstacles(cw/2,-700,120,0,cw,20,1.5);
var obstacle6=new Obstacles(cw/2,-700,95,Math.PI*1.5,c,15,1.5);

var obstacle7=new Obstacles(cw/2,-1000,70,0,cw,10,1.6);

var obstacle8=new Obstacles(cw/2,-1150,70,Math.PI*1,cw,10,1.6);

var obstacle9=new Obstacles(cw/2,-1300,70,0,cw,10,1.6);


//ball color changer
function Ballcolorchanger(y,color) {
  this.x=cw/2;
  this.y=y;
  this.radius=10;
  this.dy=0;
  this.color1="rgb(50, 219, 240)";//blue
  this.color2="rgb(255, 1, 129)";//pink
  this.color3="rgb(250, 225, 0)";//yellow
  this.color4="rgb(144, 13, 255)";//violet
  this.color=color;


  this.draw=function () {
    c.save();
    c.beginPath();
    c.fillStyle=this.color1;
    c.arc(cw/2,this.y,this.radius,0,Math.PI*0.5,false);
    c.fill();
    c.beginPath();
    c.fillStyle=this.color2;
    c.arc(cw/2,this.y,this.radius,Math.PI*0.5,Math.PI*1,false);
    c.fill();
    c.beginPath();
    c.fillStyle=this.color3;
    c.arc(cw/2,this.y,this.radius,Math.PI*1,Math.PI*1.5,false);
    c.fill();
    c.beginPath();
    c.fillStyle=this.color4;
    c.arc(cw/2,this.y,this.radius,Math.PI*1.5,Math.PI*2,false);
    c.fill();
    c.restore();


  }
  this.update=function () {

       if (movedownobstacles) {
        this.y+=1;
       }
       this.draw();
       if (distancebwpoints(ball.x,ball.y,this.x,this.y)<7) {
         ball.color=this.color;


       }


  }


}
//1.blue 2.violet 3.pink 4.yellow
//var colors=["rgb(50, 219, 240)","rgb(144, 13, 255)","rgb(255, 1, 129)","rgb(250, 225, 0)"];
var ballchange=new Ballcolorchanger(400,colors[1]);
var ballchange1=new Ballcolorchanger(150,colors[3]);
var ballchange2=new Ballcolorchanger(-100,colors[2]);
var ballchange3=new Ballcolorchanger(-250,colors[0]);
var ballchange4=new Ballcolorchanger(-400,colors[2]);
var ballchange5=new Ballcolorchanger(-1000,colors[1]);
var ballchange6=new Ballcolorchanger(-1150,colors[3]);
var ballchange7=new Ballcolorchanger(-1300,colors[0]);



//color checker
function colorcheck () {
  imgdata=c.getImageData(ball.x-10,ball.y-10,20,20);
  if (ball.color==="rgb(250, 225, 0)") {
    for (var i = 0; i < imgdata.data.length; i+=4) {
      if ((imgdata.data[i]==50 && imgdata.data[i+1]==219 && imgdata.data[i+2]==240 ) || (imgdata.data[i]==144 && imgdata.data[i+1]==13 && imgdata.data[i+2]==255) ||(imgdata.data[i]==255 && imgdata.data[i+1]==1 && imgdata.data[i+2]==129)) {
         gameover=true;
         gamestart=false;
         movedownobstacles=false;

      }

    }

  }


     else if (ball.color==="rgb(255, 1, 129)") {
    for (var i = 0; i < imgdata.data.length; i+=4) {
      if ((imgdata.data[i]==50 && imgdata.data[i+1]==219 && imgdata.data[i+2]==240 ) || (imgdata.data[i]==144 && imgdata.data[i+1]==13 && imgdata.data[i+2]==255) ||(imgdata.data[i]==250 && imgdata.data[i+1]==225 && imgdata.data[i+2]==0)) {
         gameover=true;
         gamestart=false;
         movedownobstacles=false;

      }

    }

  }



   else if (ball.color==="rgb(144, 13, 255)") {
    for (var i = 0; i < imgdata.data.length; i+=4) {
      if ((imgdata.data[i]==50 && imgdata.data[i+1]==219 && imgdata.data[i+2]==240 ) || (imgdata.data[i]==250 && imgdata.data[i+1]==225 && imgdata.data[i+2]==0) ||(imgdata.data[i]==255 && imgdata.data[i+1]==1 && imgdata.data[i+2]==129)) {
         gameover=true;
         gamestart=false;
         movedownobstacles=false;

      }

    }

  }



  else if (ball.color==="rgb(50, 219, 240)") {
    for (var i = 0; i < imgdata.data.length; i+=4) {
      if ((imgdata.data[i]==250 && imgdata.data[i+1]==225 && imgdata.data[i+2]==0 ) || (imgdata.data[i]==144 && imgdata.data[i+1]==13 && imgdata.data[i+2]==255) ||(imgdata.data[i]==255 && imgdata.data[i+1]==1 && imgdata.data[i+2]==129)) {
         gameover=true;
         gamestart=false;
         movedownobstacles=false;

      }

    }

  }


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
       c.fillText("GAME",70,200);
       c.fillText("OVER",250,200);
       c.restore();
       document.getElementById("try").style.visibility="visible";




     }

}

// draw
function draw() {
  c.fillStyle ="rgb(39, 39, 39)";
  c.fillRect(0, 0,cw,ch);
  obstacle0.update0();
  obstacle1.update0();
  obstacle2.update0();
  obstacle3.update0();
  obstacle4.update0();
  obstacle5.update0();
  obstacle6.update0();
  obstacle7.update0();
  obstacle8.update0();
  obstacle9.update0();
  colorcheck();

  ball.draw();
  ballchange.update();
  ballchange1.update();
  ballchange2.update();
  ballchange3.update();
  ballchange4.update();
  ballchange5.update();
  ballchange6.update();
  ballchange7.update();





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

  if (score>highscore) {
    highscore=score;

  }
  document.getElementById("lj").innerHTML=score;
  document.getElementById("pk").innerHTML=highscore;




}
function pause() {
  gamepause=!gamepause;
  if (gamepause==true) {
    document.getElementById("pause").innerHTML="RESUME";

  }
  else {
    document.getElementById("pause").innerHTML="PAUSE";

  }

}

//loop
function loop() {



  if (!gamepause) {

      draw();
      update();


  }


  requestAnimationFrame(loop);

}

loop();
//score
function scoreupdtae() {
  if (distancebwpoints(ball.x,ball.y,obstacle0.x,obstacle0.z)<15) {
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
  if (distancebwpoints(ball.x,ball.y,obstacle8.x,obstacle8.z)<15) {
    score=8;
  }
  if (distancebwpoints(ball.x,ball.y,obstacle9.x,obstacle9.z)<15) {
    score=9;
  }
  if (distancebwpoints(ball.x,ball.y,obstacle9.x,obstacle9.z)>200 && obstacle9.z>ball.y) {
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
var savedscore=JSON.parse(localStorage.getItem("score2"));
if (savedscore!==null) {
  highscore=savedscore;

}



function storescore() {
  if (gameover) {
      localStorage.setItem("score2",JSON.stringify(highscore));


  }


}

/*var scorerecord=[];

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
*/
