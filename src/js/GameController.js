import Board from './Board';
import GamePlay from './GamePlay';

export default class GameController {
  constructor() {
    this.board = new Board(4);
    this.gamePlay = new GamePlay(this.board);
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;

    this.scoreEl = document.getElementById('score');
    this.missesEl = document.getElementById('misses');
    this.modalOverlay = document.querySelector('.modal-overlay');
    this.modalScoreEl = document.getElementById('modal-score');
    this.playAgainButton = document.getElementById('play-again-button');

    this.onCellClick = this.onCellClick.bind(this);
    this.onPlayAgain = this.onPlayAgain.bind(this);
  }

  init() {
    this.board.drawBoard();
    this.gamePlay.startGame();
    this.registerEvents();
    this.updateStats();
  }

  registerEvents() {
    this.board.container.addEventListener('click', this.onCellClick);
    this.playAgainButton.addEventListener('click', this.onPlayAgain);
  }

  onCellClick(event) {
    if (event.target.contains(this.gamePlay.character)) {
      this.score += 1;
      this.gamePlay.removeCharacter();
    } else {
      this.misses += 1;
    }

    this.updateStats();
    this.checkGameOver();
  }

  onPlayAgain() {
    this.resetGame();
    this.hideModal();
  }

  updateStats() {
    this.scoreEl.textContent = this.score;
    this.missesEl.textContent = this.misses;
  }

  checkGameOver() {
    if (this.misses >= this.maxMisses) {
      this.gamePlay.stopGame();
      this.showModal();
    }
  }

  resetGame() {
    this.score = 0;
    this.misses = 0;
    this.updateStats();
    this.gamePlay.startGame();
  }

  showModal() {
    this.modalScoreEl.textContent = this.score;
    this.modalOverlay.classList.remove('hidden');
  }

  hideModal() {
    this.modalOverlay.classList.add('hidden');
  }
}
