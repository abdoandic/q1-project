let tileImages = ['usa.png', 'turkey.png', 'sKorea.png', 'china.png', 'canada.png', 'brazil.png'];
let gameboard = document.getElementById("gameboard");
let messageTop = document.getElementById("message");
let buttonmessage = document.getElementById("gamecontrol");
let mytime = document.getElementById("mytime");
let cardsflippedover = 0
let lastcardpicked = -1
let timer = ''
let score = 0
let mess = ''
let seconds = 0
let mseconds = 0
let minutes = 0
let hours = 0
let t =100
let gamescore = 100;
let solutionArray = tileImages.concat(tileImages);

document.getElementById("gamecontrol").addEventListener("click", startGame);
fliparray = new Array();
startGame();

function startGame() {
    clearInterval(timer);
    timerX();
    seconds = 0, mseconds = 0, minutes = 0, hours = 0, gamescore = 100;
    shuffleArray(solutionArray);
    score = 0;
    gameboard.innerHTML = "";
    buttonmessage.innerHTML = "Restart Game";
    messageText("Click a Tile to start");
    for (let i = 0; i <= ((solutionArray.length) - 1); i++) {
        gameboard.innerHTML += '<div class="col-md-3 col-xs-4 gametile"><img id="cardz' + i + '" src="galvanize.png" onclick="pickCard(\'' + solutionArray[i] + '\',\'' + i + '\',this);return false;" class="flipimage"></div>';
    }
}


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
                timer = setInterval(hideCard, 2000);
                console.log('different');
                messageText("NOT FOUND");
            }
        }
        lastcardpicked = b;
    }
}








function timerX() {
    t = setTimeout(addTime, 2000);
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
function shuffleArray(d) {
    for (let c = d.length - 1; c > 0; c--) {
        let b = Math.floor(Math.random() * (c + 1));
        let a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
}
localStorage.setItem('your time', timer)
