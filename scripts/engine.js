const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelectorAll(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    timeLife: document.querySelector("#time-life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    time: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000), 
    countDownTimerId: setInterval(down, 990), 
  },
};

function zerar() {
  state.values.time = 3;
  state.view.timeLife.textContent = 3;
  state.values.result = 0;
  state.view.score.textContent = 0;
  state.view.timeLeft.textContent = 60;
  state.values.curretTime = 62;
  
}
function down() {
  state.values.curretTime--;
  

}
function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    
  }
}

function playSound(audioName) {
  let audio = new Audio(`../audios/${audioName}.mp3`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("pancada");
        playSound("ohhater");
      }
    });
  });
}
function removeLifeHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id !== state.values.hitPosition) {
        state.values.time--;
        state.view.timeLife.textContent = state.values.time;
        state.values.hitPosition = null;
        playSound("haha");
      }
      if (state.values.time <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        zerar();
        down()
      }
    });
  });
}

function initialize() {
  moveEnemy();
  removeLifeHitBox();
  addListenerHitBox();
}

initialize();
