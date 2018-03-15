let tileImages = ['usa.png', 'turkey.png', 'sKorea.png', 'china.png', 'canada.png', 'brazil.png'];
let gameboard = document.getElementById("gameboard");
let messageTop = document.getElementById("message");
let buttonmessage = document.getElementById("gamecontrol");
let mytime = document.getElementById("mytime");
let cardsflippedover = 0
let lastcardpicked = -1
let timer = ''
let score = 0
let moves = 0
let mess = ''
let seconds = 0
let mseconds = 0
let minutes = 0
let hours = 0
let t =100
let gameScore = 100;
let solutionArray = tileImages.concat(tileImages);
let highScore = ''

//  shuffle the cards all the time reload the page

function shuffleArray(d) {
    for (let c = d.length - 1; c > 0; c--) {
        let b = Math.floor(Math.random() * (c + 1));
        let a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
}

// game conntol button

document.getElementById("gamecontrol").addEventListener("click", startGame);
fliparray = new Array();
startGame();


function pickCard(a, b, c) {
    if (cardsflippedover < 2 && lastcardpicked != b) {
        fliparray[cardsflippedover] = solutionArray[b];
        fliparray[(cardsflippedover + 2)] = c.id;
        cardsflippedover++;
        c.src = 'img/' + solutionArray[b];
        if (cardsflippedover == 2) {
            if (fliparray[0] == fliparray[1]) {
                messageText("Match FOUND");
                console.log('same');
                pickagain();
                score++;
                if (tileImages.length <= score) {
                    console.log('END GAME');
                    gameDone();
                }
            }
            else {
                timer = setInterval(hideCard, 1000);
                console.log('different');
                messageText("NOT FOUND");
            }
        }
        lastcardpicked = b;
    }
}

function hideCard() {
    console.log(fliparray);
    if (fliparray[2]) {
        document.getElementById(fliparray[2]).src = "img/galvanize.png";
    }
    if (fliparray[3]) {
        document.getElementById(fliparray[3]).src = "img/galvanize.png";
    }
    pickagain();
}

function pickagain() {
    cardsflippedover = 0;
    fliparray = [];
    lastcardpicked = -1;
    clearInterval(timer);
}


function messageText(message) {
    clearInterval(mess);
    console.log('message');
    messageTop.innerHTML = message;
    if (message != 'Find a match') {
        mess = setInterval(messageText, 2000, 'Find a match');
    }
}

//  time adding function
function timerX() {
    t = setTimeout(addTime, 2000);
}

function addTime() {
    gamescore--;

  document.querySelector('#score').innerHTML = gamescore

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;

    }


 mytime.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timerX();


}


// game done , player will score 0 when the  time (100 seconds) up
function gameDone() {
    if (gamescore < 0) {
        gamescore = 0;
    }

    buttonmessage.innerHTML = "Click to Play Again";

    window.alert("GAME OVER!!!" + " You scored = " + gamescore );

  let highScore = localStorage.setItem('your score', gamescore );

function checkScore(score){
  if (highScore > gamescore){
    highScore = gamescore
    return highScore;
  } else{
    return highScore;
  }
}checkScore();
}






function startGame() {
    clearInterval(timer);
    timerX();
    seconds = 0, mseconds = 0, minutes = 0, hours = 0, gamescore = 100;
    shuffleArray(solutionArray);
    score = 0;
    gameboard.innerHTML = "";
    buttonmessage.innerHTML = "Restart Game";

    messageText("Click any tile to start");
    for (let i = 0; i <= ((solutionArray.length) - 1); i++) {
        gameboard.innerHTML += '<div class="col-md-4 col-xs-4 gametile"><img id="cardz' + i + '" src="img/galvanize.png" onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
    }
}


function resetTimer(timer) {
    if (timer) {
        clearInterval(timer);
    }
}
