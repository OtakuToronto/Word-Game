// Word Game Functions

//DOM elements
var newGameButton = document.getElementById('newgamebutton');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessedletters');
var guessesLeft = document.getElementById('guessesleft');
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');

//Variables for game (wordBank, wins, loss, pickedWor d, guessesLeft, gameRunning, pickedWordPlaceholder, guessedLetterBank, incorrectLetterBank)
var wordBank = ['Attack on Titan', 'Princess Jellyfish', 'One Piece', 'My Love Story', 'Genshiken', 'Yuri on Ice', 'Madoka Magica', 'Welcome to the NHK', 'My Hero Academia', 'Nana'];
//var wordBank = ['test']
var winsCounter = 0;
var lossesCounter = 0;
var numberOfGuessLeft = 13;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];

//newGame-----------------------------------------------------------------------
function newGame() {
    // resetting variables on new start of game
    gameRunning = true;
    numberOfGuessLeft = 13;
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];

    //pickWord select (random selection equasion)
    // setting the word to lowercase to prevent case sensitivity issues
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();

    //placeholder set up for new pickedWord (loop)
    for (var i = 0; i < pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }
    //writes guesses left to the DOM
    guessesleft.textContent = numberOfGuessLeft;
    // adds placeholders to the DOM
    placeholders.textContent = pickedWordPlaceholderArr.join('');
    // 
    guessedLetters.testContent = incorrectLetterBank;
    console.log(pickedWord)
}

function letterGuess(letter){
    // insuring that letter hasnt been guessed and duplicates are removed
    var hasLetterBeenUsed = guessedLetterBank.includes(letter)

    // Setting the picked word to an array to allow us to find the index of the correct letter
    var pickedWordArray = []
    pickedWord.split('').forEach(function (i) {
        pickedWordArray.push(i)
    });

    // validating whether the game is allowed to run
    if (gameRunning === true && hasLetterBeenUsed === false){
        // pushing guessed letter to the guessed array 
        guessedLetterBank.push(letter)

        // validating whether the array includes the guessed letter
        guessedLetterBank.forEach(function(guessedLetter){
            // if it contains it push to correct guessed array
            if (pickedWord.includes(guessedLetter)){
                // check to see if the title includes the letter
                // iterate through pickword array to find the letter used
                for (var index = 0; index < pickedWordArray.length; index++) {
                    var element = pickedWordArray[index];
                    // if the letter typed matches
                    if (element === guessedLetter){
                        // replaces the instance in the array with the guessed letter
                        pickedWordPlaceholderArr[index] = guessedLetter
                    }
                 }

                //  writes the letter to the DOM
                placeholders.textContent = pickedWordPlaceholderArr.join(' ')
                // validates whether the array still contains underscoresa
                // no underscores indicate that a user has correctly guessed all the right letetr
                var haveYouWon = pickedWordPlaceholderArr.includes('_')
                //  runs logic if user has won
                checkIncorrect(guessedLetter);

                if(haveYouWon === false){
                    youHaveWon()
                }

            } else {
                checkIncorrect(guessedLetter);
            }
        })
    } else if (gameRunning === true && hasLetterBeenUsed === true){
        // this will run when the guessed letter is added again
        window.alert("You have already guessed this letter. Try again.");
    }else {
        window.alert("Game is not running, click new game button to start.");
    }
}


//checkIncorrect(letter)
function checkIncorrect(letter) {  
    var hasLetterBeenUsed = incorrectLetterBank.includes(letter)
    if(hasLetterBeenUsed === false){
        incorrectLetterBank.push(letter)
        //space to give space when joining.
        guessedletters.textContent = incorrectLetterBank.join(' '); 
        console.log('incorrect array ', incorrectLetterBank)
        numberOfGuessLeft--
        guessesleft.textContent = numberOfGuessLeft;
        checkLoss();
    } else{
        checkLoss()
    }
}

// Retry Game
function retryGame(){
    var response = window.confirm("You've run out of guesses, would you like to play again")
    if(response === true){
        newGame()
    } else {
        window.alert("Thanks for playing..")
    }
}

function youHaveWon(){
    var response = window.confirm("You've correctly guessed the title! Would you like to play again?")
    if (response === true) {
        newGame()
    } else {
        window.alert("Thanks for playing!")
    }
}

// function checkResult(){

// }

//checkLose
function checkLoss() {
    // verifying that no more guesses are left
    if (numberOfGuessLeft === 0) {
        lossesCounter++;
        gameRunning = false;
        losses.textContent = lossesCounter;
        placeholders.textContent = pickedWord;
        retryGame()
    }
    checkWin();
}

//checkWin
function checkWin() {
    if (pickedWord === pickedWordPlaceholderArr.join('')) {
        winsCounter++;
        gameRunning = false;
        wins.textContent = winsCounter;
    }
}

// Add event listener for new game button addes newGame as its call back function.
newGameButton.addEventListener('click', newGame);

// Add onkeyup event to trigger letterGuess (event.key is the actual letter)
document.onkeyup = function (event) {
    // console.dir(event);
    //forces only letters to be able to be entered
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        var letterGuessed = event.key.toLowerCase()
        letterGuess(letterGuessed);
    }
}

// Things i've changed = letterGuess and checkIncorrect functions. added play again and youHaveWon function
