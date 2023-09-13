const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', (event) => {
  event = memoryGame.shuffleCards();
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.add('turned');
      console.log(`Card clicked: ${card}`);
      if (memoryGame.pickedCards.length < 2) {
        memoryGame.pickedCards.push(card);
      }
      if (memoryGame.pickedCards.length === 2) {
        const fCard = memoryGame.pickedCards[0];
        const sCard = memoryGame.pickedCards[1];
        if (memoryGame.checkIfPair(fCard.getAttribute("data-card-name"), sCard.getAttribute("data-card-name"))) {
          fCard.classList.add('blocked');
          sCard.classList.add('blocked');
          memoryGame.pickedCards = [];
          const guessed = document.getElementById("pairs-guessed");
          guessed.innerHTML = memoryGame.pairsGuessed;
        } else {
          setTimeout(function () {
            fCard.classList.remove('turned');
            sCard.classList.remove('turned');
            memoryGame.pickedCards = [];
            const clicked = document.getElementById("pairs-clicked");
            clicked.innerHTML = memoryGame.pairsClicked;
          }, 500);
        }
        if (memoryGame.checkIfFinished()) {
          if (memoryGame.pairsClicked === 24) {
            alert("Are you a medium?! Congrats on making no mistakes");
          }
          else if (memoryGame.pairsClicked < 40) {
            alert("Amazing job!");
          }
        }
      }
    });
  });
});
