let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let boardHeight = 600;
let boardWidht = 1000;

let size = 50;      //height and widht for snake

let arr = [[0,0]];     //2d array for storing the starting point of the snake
let direction = "right";
let gameOver = "false";

let score = 0;

let food = generate();

let intervalId = setInterval(function(){
    update();
    draw();
},160);

document.addEventListener('keydown',function(e){
    if(e.key=="ArrowLeft"){
       direction = "left";
    }else if(e.key=="ArrowUp"){
        direction = "up";
    }else if(e.key=="ArrowDown"){
        direction = "down";
    }else{
        direction = "right";
    }
})

ctx.fillStyle = "red";
ctx.fillRect(0,0,size,size);


//function to draw snake
function draw(){
    if(gameOver=="true"){
        clearInterval(intervalId);
        ctx.font = "50px monospace";
        ctx.fillStyle = 'pink';
        ctx.fillText("GAME OVER !! ",200,200);
        return;
    }

    //snake
    ctx.clearRect(0,0,boardWidht,boardHeight);
    for(let pos of arr){
        ctx.fillStyle = 'red';
        ctx.fillRect(pos[0],pos[1],size,size);

        ctx.strokeStyle = 'green';
        ctx.strokeRect(pos[0],pos[1],size,size);
    }

    //food
    ctx.fillStyle = "green";
    ctx.fillRect(food[0],food[1],size,size);

    //score
    ctx.fillStyle = 'green';
    ctx.font = "25px monospace";
    ctx.fillText(`score: ${score}`,20,25);
}


//function to update snake
function update(){
    let headX = arr[arr.length-1][0];
    let headY = arr[arr.length-1][1];

    let x;
    let y;
    
    if(direction=="right"){
        x = headX + size;
        y = headY
    }else if(direction=="left"){
        x = headX - size;
        y = headY
    }else if(direction=="up"){
        x = headX 
        y = headY - size;
    }else{
        x = headX
        y = headY + size;
    }

    if(x==boardWidht || y==boardHeight || x<0 || y<0 || snakeBiteItself(x,y)){
        gameOver = "true";
    }
    arr.push([x,y]);

    if(x==food[0] && y==food[1]){
        food = generate();
        score++;
    }else{
        arr.shift();
    }
}

function generate(){
    return[
        Math.round((Math.random()*(boardWidht-size)) / size) * size,
        Math.round((Math.random()*(boardHeight-size)) / size) * size
    ]
}

function snakeBiteItself(x,y){
    for(let item of arr){
        if(item[0]==x && item[1]==y){
            return true;
        }
    }
    return false;
}

