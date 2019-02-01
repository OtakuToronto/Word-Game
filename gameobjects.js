//Word Game as an Object
var newGameButton = document.getElementById('newgamebutton');
var placeholders = document.getElementById('placeholders');
var guessedLetters = document.getElementById('guessedletters');
var guessesLeft = document.getElementById('guessesleft');
var wins = document.getElementById('wins');
var losses = document.getElementById('losses');
//set all as properties of the Game object
var game = {
    wordBank = ['Attack on Titan', 'Princess Jellyfish', 'One Piece', 'My Love Story', 'Genshiken', 'Yuri on Ice', 'Madoka Magica', 'Welcome to the NKK', 'My Hero Academia', 'Nana' ],
    wins = 0,
    losses = 0,
    guessesLeft = 8,
    gameRunning = false,
    pickedWord = '',
    pickedWordPlaceholderArr = [],
    guessedLetterBank = [],
    incorrectLetterBank = [],
    newGame: function() {
        // Reset all game info
        this.gameRunning = true;
        this.guessesLeft = 8;
        this.guessedLetterBank = [];
        this.incorrectLetterBank = [];
        this.pickedWordPlaceholderArr = [];
        //Random word selector
        this.pickedWord = this.wordBank[Math.floor(Math.random() * wordBank.length)];
        //Loop
    for (var i = 0; i < this.pickedWord.length; i++) {
        if (this.pickedWord[i] === ' ') {
        this.pickedWordPlaceholderArr.push(' ');
        } else {
        this.pickedWordPlaceholderArr.push('_');
        }
    }
    //Writes back to DOM
    guessesleft.textContent = this.guessesLeft;
    placeholders.textContent = this.pickedWordPlaceholderArr.join('');
    guessedletters.testContent = this.incorrectLetterBank;  
    },
    letterGuess: function(letter) {
    if (this.gameRunning === true && this.guessedLetterBank.indexOf(letter) === -1) {
        //Run game logic
        this.guessedLetterBank.push(letter);

        //Check if guessed letter is in picked word.
        for (var i = 0; i < this.pickedWord.length; i++); {
            //convert to lower case for comparison.
            if (this.pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                //if match swap out placeholder with letter
             this.pickedWordPlaceholderArr[i] = this.pickedWord[i];
            }
        }
            placeholders.textContent = this.pickedWordPlaceholderArr.join('');
            //Pass letter int checkIncorrect function    
            this.checkIncorrect(letter);
         } else {
                if (!this.gameRunning) {  
                    window.alert("Game is not running, click new game button to start.");
                    } else {
                    window.alert("You have already guessed this letter. Try again.");
                }
  
            }
    },
    checkIncorrect: function(letter) {
        //Check if the letter you guessed made it's way to the place holder array. (if correct)
    if (this.pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && this.pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
            this.guessesLeft--;
            this.incorrecrtLetterBank.push(letter);
            guessedletters.textContent = this.incorrectLetterBank.join(' '); //space to give space when joining.
            guessesleft.textContent = this.guessesLeft;
        }
        //Did you loose?
        this.checkLoss();
    },
    checkLoss: function() {
        //Check if you lose
    if (this.guessesLeft === 0) {
        this.losses++;
        // end game
        this.gameRunning = false;
        losses.textContent = this.losses;
        placeholders.textContent = this.pickedWord;
    }
    this.checkWin();
},
    checkWin: function() {
    if (this.pickedWord.toLowerCase() === this.pickedWordPlaceholderArr.join("").toLowerCase()) {
        this.wins++;
        //end game
        this.gameRunning = false;
        wins.textContent = this.wins;
        }
    }
};
// Add event listener for new game button addes newGame as its call back function.
newGameButton.addEventListener('click', function() {
    game.newGame();
 
});
// Add onkeyup event to trigger letterGuess (event.key is the actual letter)
document.onkeyup = function(event) {
    console.dir(event);
    //forces only letters to be able to be entered
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        game.letterGuess(event.key);
    }
}

