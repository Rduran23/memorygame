// GAME OPTIONS
const TOTAL_CARDS = 12

let CURRENT_DIFFICULT = 0

const fruits = ["🍏","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑"]

let selectedfruits = []
let fruits_finded = 0
let clickedFruits = []
let lastPicked

const preGameContainer = document.querySelector('.pregame')
const gameContainer = document.querySelector('.game')
const footerGameContainer = document.querySelector('.footergame')

const contador = document.querySelector('.timer p')

const countdowninterval = setInterval(() => {countdown()}, 1000)

let contadorTimer = 60

function startGame(difficult){
    CURRENT_DIFFICULT = difficult
    selectedfruits = []
    gameContainer.style = ""
    footerGameContainer.style = ""
    preGameContainer.style = "display: none"
    gameContainer.innerHTML = ""
    selectCards()
    //setInterval(countdowninterval, 1000);
}

function restartGame(){

}

function selectCards(){
    for (let i = 0; i < TOTAL_CARDS / 2; i++){
        let randomfruit = Math.floor(Math.random() * fruits.length)
        if (!selectedfruits.includes(fruits[randomfruit])){
            selectedfruits.push(fruits[randomfruit])
            selectedfruits.push(fruits[randomfruit])
        }else{
           i--;
        }
    }
    fisher_yates()
}

function fisher_yates(){
    let array = selectedfruits;
    let i = array.length;
    while (--i > 0) {
       let temp = Math.floor(Math.random() * (i + 1));
       [array[temp], array[i]] = [array[i], array[temp]];
    }
    loadCards()
 };

 function loadCards(){
    for (let i = 0; i < TOTAL_CARDS; i++){
        let cardconstructor = `<div class="card" onclick="test(this)"><div class="front"><p>❔</p></div><div class="back"><p>${selectedfruits[i]}</p></div></div>`
        gameContainer.innerHTML += cardconstructor
    }
 }

 function test(e){
    let v = e.childNodes[1].childNodes[0].innerHTML
    let step = clickedFruits.length
    e.classList.add("picked")

    if (step == 0){
        clickedFruits.push(v)
        lastPicked = e
    }
    if (step == 1){
        if (clickedFruits.includes(v)){
            fruits_finded++;
            if (fruits_finded >= TOTAL_CARDS / 2){
                let spanganadas = document.querySelector('.score p span')
                spanganadas.innerHTML = parseInt(spanganadas.innerHTML) + 1
            }
        }else{
            //spinCards()
        }
        clickedFruits = []
    }   
 }



function countdown(){
    contadorTimer--
    if (contadorTimer <= 0){
        contadorTimer = 0
    }
    contador.innerHTML = contadorTimer

}