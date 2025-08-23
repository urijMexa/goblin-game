import goblinImg from '../img/goblin.png';

export default class GameController {
  constructor() {
    this.boardSize = 4;
    this.gameContainer = document.getElementById('game-container');
    this.scoreEl = document.getElementById('score');
    this.missesEl = document.getElementById('misses');

    this.cells = [];
    this.character = null;
    this.currentPosition = -1;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.interval = null;

    this.onCellClick = this.onCellClick.bind(this);
  }

  init() {
    this.drawBoard();
    this.createCharacter();
    this.gameContainer.addEventListener('click', this.onCellClick);
    this.start();
  }

  drawBoard() {
    for (let i = 0; i < this.boardSize ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.gameContainer.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createCharacter() {
    const characterEl = document.createElement('img');
    characterEl.src = goblinImg;
    characterEl.classList.add('goblin');
    this.character = characterEl;
  }

  start() {
    this.interval = setInterval(() => {
      if (this.currentPosition !== -1) {
        this.misses += 1;
        this.updateStats();
        this.checkGameOver();
      }
      this.moveCharacter();
    }, 1000);
  }

  moveCharacter() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.cells.length);
    } while (newPosition === this.currentPosition);

    if (this.currentPosition !== -1) {
      this.cells[this.currentPosition].innerHTML = '';
    }

    this.currentPosition = newPosition;
    this.cells[this.currentPosition].appendChild(this.character);
  }

  onCellClick(event) {
    if (event.target.contains(this.character)) {
      this.score += 1;
      this.updateStats();
      this.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = -1;
      clearInterval(this.interval);
      this.start();
    }
  }

  updateStats() {
    this.scoreEl.textContent = this.score;
    this.missesEl.textContent = this.misses;
  }

  checkGameOver() {
    if (this.misses >= this.maxMisses) {
      clearInterval(this.interval);
      alert(`Game Over! Your score: ${this.score}`);
      // Можно добавить логику перезапуска игры
      this.resetGame();
    }
  }

  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.updateStats();
    if (this.currentPosition !== -1) {
      this.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = -1;
    }
    this.start();
  }
}
