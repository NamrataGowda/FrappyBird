//board
let board;
let context;
let boardWidth = 360;
let boardHeight = 640;

//bird
let birdWidth = 50;  
let birdHeight = 50;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

//movement of pipes
let velocityX = -2;

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
let pipeWidth = 34;
let pipeHeight = 512;

let topPipeImage;
let bottomPipeImage;

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

    requestAnimationFrame(update);
    setInterval(pipeAppear,1500);
}

//This function is for updating the background screens
function update(){

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //bird gets updated
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    for(let i=0;i<pipeArray.length;i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}

//This function is to make the pipes appear

function pipeAppear(){

    let topPipe = {
        img: topPipeImage,
        x:pipeX,
        y: pipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);
}



