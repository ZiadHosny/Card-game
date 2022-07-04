var newGameBtn = document.getElementById('new-game');
newGameBtn.onclick = newGame;
var hintBtn = document.getElementById('hint');
hintBtn.onclick = hint;
var timerDiv = document.getElementById('timer');

var parent = document.getElementById('parent');
var body = document.getElementsByTagName('body')[0];

var heartsDiv = document.getElementById('hearts');
let hearts = '♥ ♥ ♥';
heartsDiv.innerHTML = hearts;

let items = [];
var itemsTaken = Array.from(Array(24).keys());

var interval;
var gameIsOver;

let sec = 0,
  min = 3;

let firstFlip = -1,
  secondFilp = -2,
  firstCard;

const cards = [
  {
    id: 0,
    url: "url('images/king.svg')",
  },
  {
    id: 1,
    url: "url('images/ace.svg')",
  },
  {
    id: 2,
    url: "url('images/joker.svg')",
  },
  {
    id: 3,
    url: "url('images/j.svg')",
  },
  {
    id: 4,
    url: "url('images/q.svg')",
  },
  {
    id: 5,
    url: "url('images/seven.svg')",
  },
  {
    id: 6,
    url: "url('images/three.svg')",
  },
  {
    id: 7,
    url: "url('images/teddybear.svg')",
  },
  {
    id: 8,
    url: "url('images/penguin.svg')",
  },
  {
    id: 9,
    url: "url('images/eid.svg')",
  },
  {
    id: 10,
    url: "url('images/alien.svg')",
  },
  {
    id: 11,
    url: "url('images/ten.svg')",
  },
];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function flipCard(e) {
  var card = e.target;
  if (firstFlip < 0) {
    card.style.backgroundImage = cards[card.id].url;
    card.style.setProperty('pointer-events', 'none');

    firstCard = card;
    firstFlip = card.id;
  } else if (secondFilp < 0) {
    card.style.backgroundImage = cards[card.id].url;
    secondFilp = card.id;
  }

  if (firstFlip != secondFilp && secondFilp > -1) {
    setTimeout(() => {
      card.style = "backgroundImage : url('images/card.svg')";
      firstCard.style = "backgroundImage : url('images/card.svg')";
      firstFlip = -1;
      secondFilp = -2;
    }, 700);
  }
  if (firstFlip == secondFilp) {
    itemsTaken[items.indexOf(firstCard)] = 'Z';
    itemsTaken[items.indexOf(card)] = 'Z';

    card.style.setProperty('pointer-events', 'none');
    firstCard.style.setProperty('pointer-events', 'none');
    firstFlip = -1;
    secondFilp = -2;
  }

  if (itemsTaken.every((e) => e == 'Z')) {
    winner();
  }
}

function timer() {
  interval = setInterval(() => {
    sec--;
    if (sec < 0) {
      min--;
      sec = 59;
    }

    if (sec < 0 || min < 0) {
      gameOver();
      return;
    }
    timerDiv.innerHTML = '0' + min + ' : ' + (sec < 10 ? '0' + sec : sec);
  }, 1000);
}

function hint() {
  hearts = hearts.slice(0, -1).trim();
  heartsDiv.innerHTML = hearts;

  var itemsWithoutZ = itemsTaken.filter((e) => {
    return e != 'Z';
  });

  var index = Math.floor(Math.random() * itemsWithoutZ.length);

  var hintId = items[itemsWithoutZ[index]].id;

  var hints = items.filter((e) => {
    return e.id == hintId;
  });

  hints[0].style.backgroundImage = cards[hintId].url;
  hints[0].style.setProperty('pointer-events', 'none');

  itemsTaken[items.indexOf(hints[0])] = 'Z';
  itemsTaken[items.indexOf(hints[1])] = 'Z';

  setTimeout(() => {
    hints[1].style.backgroundImage = cards[hintId].url;
    hints[1].style.setProperty('pointer-events', 'none');

    if (itemsTaken.every((e) => e == 'Z')) {
      winner();
    }
  }, 600);

  if (!hearts) {
    hintBtn.style.setProperty('pointer-events', 'none');
  }
}

function gameOver() {
  hintBtn.style.setProperty('pointer-events', 'none');
  clearInterval(interval);
  parent.innerHTML = '';
  body.classList.add('loser');
}

function winner() {
  hintBtn.style.setProperty('pointer-events', 'none');
  clearInterval(interval);
  parent.innerHTML = '';
  body.classList.add('winner');
}

function newGame() {
  hintBtn.style.setProperty('pointer-events', 'auto');
  clearInterval(interval);
  timer();
  body.classList.remove('winner');
  body.classList.remove('loser');
  itemsTaken = Array.from(Array(24).keys());
  (firstFlip = -1), (secondFilp = -2);
  (hearts = '♥ ♥ ♥'), (heartsDiv.innerHTML = hearts);
  (sec = 0), (min = 3);
  (items = []), (parent.innerHTML = '');
  for (var i = 0; i < cards.length; i++) {
    for (var j = 0; j < 2; j++) {
      var div = document.createElement('div');
      div.classList.add('item', 'col-2');
      div.id = cards[i].id;
      div.style.backgroundImage = "url('images/card.svg')";
      div.onclick = (e) => {
        flipCard(e);
      };
      items.push(div);
    }
  }
  shuffle(items);

  items.forEach((e) => {
    parent.appendChild(e);
  });
}

newGame();
