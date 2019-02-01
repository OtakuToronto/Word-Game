// Word Game Functions

//DOM elements
var newGameButton = document.getElementById('newgamebutton');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessedletters');
var guessesLeft = document.getElementById('guessesleft');
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');

//Variables for game (wordBank, wins, loss, pickedWor d, guessesLeft, gameRunning, pickedWordPlaceholder, guessedLetterBank, incorrectLetterBank)
// var wordBank = ['Attack on Titan', 'Princess Jellyfish', 'One Piece', 'My Love Story', 'Genshiken', 'Yuri on Ice', 'Madoka Magica', 'Welcome to the NKK', 'My Hero Academia', 'Nana' ];
var winsCounter = 0;
var lossesCounter = 0;
var guessesLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//newGame-----------------------------------------------------------------------
function newGame() {
    gameRunning = true;
    guessesLeft = 8;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    
//pickWord select (random selection equasion)
pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

//placeholder set up for new pickedWord (loop)
for (var i = 0; i < pickedWord.length; i++) {
    if (pickedWord[i] === ' ') {
        pickedWordPlaceholderArr.push(' ');
    } else {
        pickedWordPlaceholderArr.push('_');
    }
    }
//wites to DOM
    guessesleft.textContent = guessesLeft;  
    placeholders.textContent = pickedWordPlaceholderArr.join('');
    guessedletters.testContent = incorrectLetterBank;  
}

// letterGuess function, takes in the letter your pressed and sees if it's in the selected word
function letterGuess(letter) {
    console.log(letter);

    if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
        //Run game logic
        guessedLetterBank.push(letter);
        
        //Check if guesses letter is in the word
        for (var i = 0; i < pickedWord.length; i++); {
            //convert to lower case for comparison.
            if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                //if match swap out placeholder with letter
             pickedWordPlaceholderArr[i] = pickedWord[i];
            }
        }   //Write back to DOM
            console.log(pickedWordPlaceholderArr)
            placeholders.textContent = pickedWordPlaceholderArr.join('');
            checkIncorrect(letter);
    }     //! checks for the opposite. In this case check for false for gameRunning
    else {
        if (!gameRunning) {  
            window.alert("Game is not running, click new game button to start.");
            } else {
            window.alert("You have already guessed this letter. Try again.");
             }
        }
    }    
        
//checkIncorrect(letter)
function checkIncorrect(letter) {
    if (
        pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 
        && 
        pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1
        ) {
            guessesLeft--;
            incorrecrtLetterBank.push(letter);
            //Write incorrect letter to DOM
            guessedletters.textContent = incorrectLetterBank.join(' '); //space to give space when joining.
            // Write new amount of guesses left to DOM
            guessesleft.textContent = guessesLeft;
        }
        checkLoss();
}
//checkLose
function checkLoss() {
    if (guessesLeft === 0) {
        lossesCounter++;
        console.log(lossesCounter);
        losses.textContent = lossesCounter;
        gameRunning = false;
        placeholders.textContent = pickedWord;
        guessesLeft = guessesLeft -1;
    }
    // console.log(losses)
    checkWin();
}

//checkWin
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join("").toLowerCase()) {
        winsCounter++;
        gameRunning = false;
        wins.textContent = winsCounter;
    }
}

// Add event listener for new game button addes newGame as its call back function.
newGameButton.addEventListener('click', newGame);

// Add onkeyup event to trigger letterGuess (event.key is the actual letter)
document.onkeyup = function(event) {
    console.dir(event);
    //forces only letters to be able to be entered
   // if (event.key>= 65 && event.key <= 90) {
        letterGuess(event.key);
    }
//}