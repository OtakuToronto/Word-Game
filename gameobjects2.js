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
var wins = 0;
var losses = 0;
var numberOfGuessLeft = 8;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


var newGame= function() {
    // Reset all game info
    this.gameRunning = true,
    this.numberOfGuessLeft = 8,
    this.guessedLetterBank = [],
    this.incorrectLetterBank = [],
    this.pickedWordPlaceholderArr = [],
    
    //Random word selector
    this.pickedWord = this.wordBank[Math.floor(Math.random() * wordBank.length)];

    //Loop
    for (var i = 0; i < this.pickedWord.length; i++) {
        if (this.pickedWord[i] === ' ') {
        this.pickedWordPlaceholderArr.push(' '),
        } else {
        this.pickedWordPlaceholderArr.push('_'),
        }
    }
  //Writes back to DOM
  guessesLeft.textContent = this.numberOfGuessLeft;
  placeholders.textContent = this.pickedWordPlaceholderArr.join('');
  guessedletters.testContent = this.incorrectLetterBank;


 letterGuess: function(letter) {
    var hasLetterBeenUsed = guessedLetterBank.includes(letter)
    var pickedWordArray = []
    this.pickedWord.split('').forEach(function (i) {
        pickedWordArray.push(i)
    });

    if (this.gameRunning === true && this.hasLetterBeenUsed === false){
        this.guessedLetterBank.push(letter)
        this.guessedLetterBank.forEach(function(guessedLetter){

            if (pickedWord.includes(guessedLetter)){
                for (var index = 0; index < this.pickedWordArray.length; index++) {
                    var element = this.pickedWordArray[index];
                    if (element === this.guessedLetter){
                        this.pickedWordPlaceholderArr[index] = this.guessedLetter
                    }
                 }
                placeholders.textContent = this.pickedWordPlaceholderArr.join(' ')
                var haveYouWon = this.pickedWordPlaceholderArr.includes('_')
                if(this.haveYouWon === false){
                    youHaveWon()
                }
            } else {
                checkIncorrect(this.guessedLetter);
            }
        })
    } else if (!this.gameRunning === true && this.hasLetterBeenUsed === true){
        window.alert("You have already guessed this letter. Try again.");
    }else {
        window.alert("Game is not running, click new game button to start.");
    }
}

checkIncorrect: function(letter) {  
    var hasLetterBeenUsed = this.incorrectLetterBank.includes(letter)
    if(this.hasLetterBeenUsed === false){
        this.incorrectLetterBank.push(letter)
        this.guessedletters.textContent = this.incorrectLetterBank.join(' '); 
        console.log('incorrect array ', this.incorrectLetterBank)
        this.numberOfGuessLeft--
        this.guessesleft.textContent = this.numberOfGuessLeft;
        checkLoss();
    } else{
        return
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

//checkLose
checkLoss: function() {
    // verifying that no more guesses are left
    if (numberOfGuessLeft === 0) {
        losses++;
        gameRunning = false;
        losses.textContent = losses;
        placeholders.textContent = pickedWord;
        retryGame()
    }
    checkWin();
}
checkWin: function() {
    if (this.pickedWord.toLowerCase() === this.pickedWordPlaceholderArr.join("").toLowerCase()) {
        wins++;
        this.gameRunning = false;
        wins.textContent = this.wins;
    }
}
newGameButton.addEventListener('click', function() {
    game.newGame();
});
{
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        var letterGuessed = event.key.toLowerCase()
        letterGuess(letterGuessed);
    }
}
},