import Board from './Board';
import Goblin from './Goblin';

export default class GameController {
  constructor() {
    this.board = new Board(4);
    this.goblin = new Goblin(this.board);
    this.goblin.element = Goblin.createElement();

    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.interval = null;

    this.scoreEl = document.getElementById('score');
    this.missesEl = document.getElementById('misses');

    this.onCellClick = this.onCellClick.bind(this);
  }

  init() {
    this.board.drawBoard();
    this.board.container.addEventListener('click', this.onCellClick);
    this.startGame();
  }

  startGame() {
    this.interval = setInterval(() => {
      if (this.goblin.currentPosition !== -1) {
        this.misses += 1;
        this.updateStats();
        this.checkGameOver();
      }
      this.goblin.place();
    }, 1000);
  }

  onCellClick(event) {
    if (event.target.contains(this.goblin.element)) {
      this.score += 1;
      this.goblin.remove();
      clearInterval(this.interval);
      this.startGame();
    } else {
      this.misses += 1;
    }
    this.updateStats();
    this.checkGameOver();
  }

  updateStats() {
    this.scoreEl.textContent = this.score;
    this.missesEl.textContent = this.misses;
  }

  checkGameOver() {
    if (this.misses >= this.maxMisses) {
      clearInterval(this.interval);
      alert(`Game Over! Your score: ${this.score}`);
      this.resetGame();
    }
  }

  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.updateStats();
    this.goblin.remove();
    this.startGame();
  }
}
