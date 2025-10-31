const menuBtn = document.querySelector('#menu-btn');
const cards = document.querySelectorAll('.card');
const score = document.querySelectorAll('.score');
const bar = document.querySelectorAll('.bar');
const menu = document.querySelector('#menu-container');
const playAgainBtn = document.querySelector('#play-again-btn');
const winnerMsgEl = document.querySelector('#winner-msg');
let clickedCardId, clickedCardClass = '';
let cardsLeft = cards.length / 2;
let type = 1;
let currPlayer = 'one';
const obj = {
    0: ['zero', '<p class="card-num">0</p>', '<img src="./assets/type2/naruto.jpg" />', '<img src="./assets/type3/tanjiro.jpg" />'],
    1: ['one', '<p class="card-num">1</p>', '<img src="./assets/type2/sasuke.jpg" />', '<img src="./assets/type3/zenitsu.jpg" />'],
    2: ['two', '<p class="card-num">2</p>', '<img src="./assets/type2/sakura.jpg" />', '<img src="./assets/type3/giyu.jpg" />'],
    3: ['three', '<p class="card-num">3</p>', '<img src="./assets/type2/hinata.jpg" />', '<img src="./assets/type3/gyomei.jpg" />'],
    4: ['four', '<p class="card-num">4</p>', '<img src="./assets/type2/tsunade.jpg" />', '<img src="./assets/type3/kyojuro.jpg" />'],
    5: ['five', '<p class="card-num">5</p>', '<img src="./assets/type2/jiraiya.jpg" />', '<img src="./assets/type3/muichiro.jpg" />'],
    6: ['six', '<p class="card-num">6</p>', '<img src="./assets/type2/itachi.jpg" />', '<img src="./assets/type3/obanai.jpg" />'],
    7: ['seven', '<p class="card-num">7</p>', '<img src="./assets/type2/lee.jpg" />', '<img src="./assets/type3/sanemi.jpg" />'],
    8: ['eight', '<p class="card-num">8</p>', '<img src="./assets/type2/kakashi.jpg" />', '<img src="./assets/type3/shinobu.jpg" />'],
    9: ['nine', '<p class="card-num">9</p>', '<img src="./assets/type2/obito.jpg" />', '<img src="./assets/type3/tengen.jpg" />'],
    10: ['ten', '<p class="card-num">10</p>', '<img src="./assets/type2/madara.jpg" />', '<img src="./assets/type3/zenshuchuten.jpg" />'],
    11: ['eleven', '<p class="card-num">11</p>', '<img src="./assets/type2/hashirama.jpg" />', '<img src="./assets/type3/akaza.jpg" />'],
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11
};

let playerObj = {one:0, two:0};

function arrangeCards() {
  let arr = [], arr1 = [];
  const len = cards.length;
  
  for (let i = 0; i < len / 2; i++) {
    arr.push(i);
    arr.push(i);
  }
  
  for (let i = 0; i < len; i++) {
    const randIndex = Math.floor(Math.random() * len);
    const randDeg = Math.floor(Math.random() * (40 + 40) - 40);
    cards[i].style.transform = `rotate(${randDeg}deg)`;
    if (!arr1.includes(randIndex)) {
      arr1.push(randIndex);
      cards[i].innerHTML = '';
      cards[i].className = '';
      cards[i].className = `card ${obj[arr[randIndex]][0]}`;
      cards[i].id = `${randIndex}`;
    } else i--;
  }
}

function updatePlayer() {
  if (currPlayer === 'one') currPlayer = 'two';
  else currPlayer = 'one';  
}

function updateScore() {
  if (currPlayer === 'one') score[0].textContent++;
  else score[1].textContent++;
}

function updateIndicationBar() {
  if (currPlayer === 'one') {
    bar[0].style.height = 0;
    bar[1].style.height = '100px';
  } else {
    bar[1].style.height = 0;
    bar[0].style.height = '100px';
  }
}
 
arrangeCards();

menuBtn.addEventListener('click', () =>  {
  menu.style.display = 'flex';
  menu.querySelector('#close-btn').addEventListener('click', () => menu.style.display = 'none');
  const typeBtns = menu.querySelectorAll('.type');
  typeBtns.forEach((typeBtn, index) => {
    typeBtn.addEventListener('click', () => {
      type = index + 1;
      menu.style.display = 'none';
    });
  });
});

cards.forEach(card => {
  card.addEventListener('click', () => {
    const cardNum = card.className.slice(5);
    const cardId = card.id;
    card.style.transform = 'rotateY(180deg)';
    card.innerHTML = obj[obj[cardNum]][type];
    if (clickedCardClass) {
      setTimeout(() => {
        if (clickedCardClass === cardNum && cardId !== clickedCardId) {
          const matchedCards = document.querySelectorAll(`.card.${clickedCardClass}`);
          matchedCards.forEach(matchedCard => {
            matchedCard.style.opacity = 0;
          });
          playerObj[currPlayer]++;
          updateScore();
          cardsLeft--;
          if (cardsLeft === 0) {
            menu.style.display = 'flex';
            if (playerObj.one === playerObj.two) winnerMsgEl.textContent = 'Draw';
            else if (playerObj.one > playerObj.two) winnerMsgEl.textContent = 'Red Won';
            else winnerMsgEl.textContent = 'Blue Won';
          }
        } else if (cardId !== clickedCardId) {
          const clickedCardEl = document.getElementById(clickedCardId);
          clickedCardEl.style.transform = 'rotateY(0deg)';
          clickedCardEl.innerHTML = '';
          card.style.transform = `rotateY(0) rotateZ(${Math.floor(Math.random() * (40 + 40) - 40)}deg)`;
          clickedCardEl.style.transform = `rotateY(0) rotateZ(${Math.floor(Math.random() * (40 + 40) - 40)}deg)`;
          card.innerHTML = '';
          updateIndicationBar();
          updatePlayer();
        }
        if (cardId !== clickedCardId) {
          clickedCardClass = '';
          clickedCardId = -1;
        }
        }, 800
      );
    } else {
      clickedCardClass += cardNum;
      clickedCardId = cardId;
    }
  });
});

playAgainBtn.addEventListener('click', () => {
  playerObj.one = 0;
  playerObj.two = 0;
  cardsLeft = cards.length / 2;
  menu.style.display = 'none';
  cards.forEach(card => {
    card.style.opacity = 1;
    card.style.transform = 'rotateY(0)';
  });
  score[0].textContent = 0;
  score[1].textContent = 0;
  arrangeCards();
});