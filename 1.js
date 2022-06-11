const grid = document.querySelector('.grid')
const startbtn = document.querySelector('#start')
const scoreDisplay = document.querySelector('#score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let intervalTime = 500
let speed = 50
let gameRunning = false
let timerId = 0

window.onload=function(){
    document.querySelector('#btndown').addEventListener("click", function(){
        direction = width
    })
    document.querySelector('#btnup').addEventListener("click", function(){
        direction = -width
    })
    document.querySelector('#btnleft').addEventListener("click", function(){
        direction = -1
    })
    document.querySelector('#btnright').addEventListener("click", function(){
        direction = 1
    })
  }



function startGame(){
    if(gameRunning === false){
        startbtn.textContent="START"
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(timerId)
        currentSnake = [2,1,0]
        score = 0
        scoreDisplay.textContent = score
        direction = 1
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        intervalTime = 500
        timerId = setInterval(move, 500)
        generateApple()
        gameRunning = true
    }

}
startbtn.addEventListener("click", startGame)

function createGrid(){
    for(let i = 0; i<width*width; i++){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()


function move(){
    if(
        (currentSnake[0] +width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake')
    ){
        clearInterval(timerId)
        gameRunning = false
        startbtn.textContent = "RESTART"
    }



    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0]+direction)
    squares[currentSnake[0]].classList.add('snake')

    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        intervalTime -= speed
        timerId = setInterval(move, intervalTime)

    }
}


function control(e){
    if(e.key === "ArrowDown"){
        console.log("down")
        direction = width

    }else if(e.key === "ArrowUp"){
        console.log("up")
        direction = -width
    }else if(e.key === "ArrowRight"){
        console.log("right")
        direction = 1
    }else if(e.key === "ArrowLeft"){
        console.log("left")
        direction = -1
    }
}


document.addEventListener("keyup", control)





function generateApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length)+1
    }while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}
