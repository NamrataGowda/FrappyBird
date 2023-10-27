//board
let board;
let context;
let boardWidth = 360;
let boardHeight = 640;

//bird
let birdWidth = 60;  
let birdHeight = 42;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

//object of bird 
let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//pipe
let pipeArray = [];
let pipeX = boardWidth;
let pipeY = 0;
let pipeWidth = 80;
let pipeHeight = 400;

let topPipeImage;
let bottomPipeImage;

//movement of pipes & more
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;
let gameOver = false;
let score = 0;


//Adding this line here to stop the game from starting right away

let gameStart = false;  // This is a boolean flag

//GAMEOVER message
let go;
let g = {
    x: 45,
    y: 150,
    w: 300,
    h: 200,
    }

//START button
let s;
let st = {
    x: 45,
    y: 150,
    w: 200,
    h: 50,
}

//SCORE board
let sc;
let sco = {
    x: 45,
    y: 150,
    w: 300,
    h: 200,
}

window.onload = function(){

    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");

    
    //loading image of bird
    birdImg = new Image();
    birdImg.src = "./flappybird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }
    
    //loading image of pipe
    topPipeImage = new Image();
    topPipeImage.src = "./fb-pipe-top.png";

    bottomPipeImage = new Image();
    bottomPipeImage.src = "./fb-pipe-bottom.png";

    //Loading the message GAME OVER !
    go = new Image();
    go.src = './game-over.png';

    //Loading of Start button
    s = document.createElement('img');
    s.src = './start-button-sprite.png';
    //s.setAttribute('id','start');
    s.onload = function(){
        context.drawImage(s,st.x,st.y,st.w,st.h);
    }

    //loading of score board
    sc = document.createElement('div');
    sc.setAttribute('id','score-overlay');
    sc.onload = function(){
        context.drawImage(sc, sco.x, sco.y, sco.h, sco.w);
    }
    //function to evoke the start button
    document.getElementById('start').addEventListener('click', function(){
        if(!gameStart){
            startGame();
            gameStart == true;
        }
    });
}


function startGame(){

    bird.x = birdX;
    pipeArray = [];
    score = 0;
    gameOver = false;

       //Game logic starts here
    requestAnimationFrame(update);
    setInterval(pipeAppear,2200);
    document.addEventListener("keydown", birdMove);
}


    //Clears pipes once the bird passes them
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }


//This function is for updating the background screens
function update(){

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //This will make the bird move
    velocityY+=gravity;
    bird.y = Math.max(bird.y + velocityY, 0);
    //bird.y += velocityY; -> This will make the bird fly w/o coming down
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //this tests for bird falling down
    if(bird.y > board.height){
        gameOver = true;
    }

    //This will make the pipes appear
    for(let i=0;i<pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

         //Condition for score board to update
    if(!pipe.passed && bird.x > pipe.x + pipe.width){
        score+=0.5;
        pipe.passed = true;
    }
        if(checkCollision(bird,pipe)){
            gameOver = true;
        }
    }

    //Clear pipes once the bird passes them
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift();
    }

    if(gameOver){
        context.drawImage(go,g.x,g.y,g.w,g.h);
        showScore();
        return;
    }
drawScore();
}

//This function is to make the pipes appear

function pipeAppear(){

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let OpenSpace = board.height/4;

    if(gameOver){
        return;
    }

    let topPipe = {
        img: topPipeImage,
        x:pipeX,
        y: randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);
    
    let bottomPipe = {
        img: bottomPipeImage,
        x: pipeX,
        y: randomPipeY + pipeHeight + OpenSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);
}

//This function will make the bird fly 

function birdMove(e){

    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
        velocityY = -8;
    }

    //reset
    if(gameOver){
        bird.x = birdX;
        pipeArray = [];
        score = 0;
        gameOver = false;
    }
}

//This function will check for collisions b/n bird and pipe
function checkCollision(a,b){

    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
    
}

    //Code for score board
    function drawScore(){

        context.fillStyle = "Black";
        context.font = "45px Teko";
        context.fillText(score, 5, 50);
    
        }
    // code for showing Score once the game is over 
    function showScore(){
        /*sc.onload = function(){
            context.drawImage(sc, sco.x, sco.y, sco.h, sco.w);
        }*/
        sc.innerHTML = "SCORE:" +score;
    }