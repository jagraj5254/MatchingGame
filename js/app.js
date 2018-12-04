const deck = document.querySelector(".deck");
const cards = document.querySelectorAll(".card");
const moves = document.querySelector(".moves");
const restart = document.querySelector(".restart");
const totalStars = document.querySelector(".stars");
const stars = `<i class="fa fa-star"></i>`;
let selectedCards = [];
let matchedCards = [];
let currentCard = 1;
let moveCount= 0;

/*
 * Create a list that holds all of your cards
 */

let cardsList = Array.from(cards);

 /*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let shuffle1 = shuffle(cardsList);

for(let card of cards ){
    deck.removeChild(card);
};

for(let cardList of cardsList){
    deck.appendChild(cardList);
    cardList.classList.remove("open", "show", "match");
};

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener("click", function(e){
    if (e.target.nodeName === "LI" && !(e.target.classList.contains("show", "open"))){
        e.target.classList.add("show");
        e.target.classList.add("open");
        selectedCards.push(e.target);
        if(currentCard % 2 === 0){
        compareCards();
        moveCount ++;
        moves.textContent = moveCount;
        
        };
        currentCard ++;
        starsUpdate();
        checkWin();
    };
    
});

// compare the cards to check match and unmatch state
function compareCards(){
    if(selectedCards[0].innerHTML === selectedCards[1].innerHTML){
    selectedCards[0].classList.add("match");
    selectedCards[1].classList.add("match");
    matchedCards.push(selectedCards[0]);
    matchedCards.push(selectedCards[1]);
    selectedCards.pop();
    selectedCards.pop();
}else{ 
    setTimeout(function(){
        selectedCards[0].classList.remove("show", "open");
        selectedCards[1].classList.remove("show", "open");
        selectedCards = [];
        selectedCards.pop();
        selectedCards.pop();
    },300)
    };
};

// update the stars according to the moves
function starsUpdate(){
    if(moveCount <= 20 && moveCount > 12){
        totalStars.innerHTML = stars + stars;
    }else if (moveCount > 20){
        totalStars.innerHTML = stars;
    }else{
        totalStars.innerHTML = stars + stars + stars;
    };
};

// reset the page once its clicked
function reset(){
    for(let cardList of cardsList){
        cardList.classList.remove("match", "show", "open");
};
    moveCount = 0;
    moves.textContent = moveCount;
    totalStars.innerHTML = stars + stars + stars;
    matchedCards = [];

    let shuffle1 = shuffle(cardsList);

};
restart.addEventListener("click", function(){
    reset();
});

// check the win condition
function checkWin(){
    if(matchedCards.length === 16){
        swal(
            'GOOD JOB!',
            'YOU MATCHED ALL THE CARDS!',
            'success'
          );
    };
};