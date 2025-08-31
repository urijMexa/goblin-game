export class GameController {
  constructor(board, goblin) {
    this.board = board;
    this.goblin = goblin;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.isGameActive = true;
    this.timer = null;

    this.scoreElement = document.getElementById('score');
    this.missesElement = document.getElementById('misses');
    this.modal = document.getElementById('gameModal');
    this.modalMessage = document.getElementById('modalMessage');
    this.restartButton = document.getElementById('restartButton');

    this.init();
  }

  init() {
    this.updateUI();
    this.startGame();

    this.restartButton.addEventListener('click', () => {
      this.restartGame();
    });
  }

  startGame() {
    this.timer = setInterval(() => {
      if (!this.isGameActive) return;

      this.moveGoblin();
    }, 1000);
  }

  moveGoblin() {
    if (!this.goblin.move()) {
      // Если гоблин не смог переместиться (все позиции заняты)
      this.handleMiss();
      return;
    }

    // Увеличиваем промахи, если гоблин исчез и не был кликнут
    setTimeout(() => {
      if (this.isGameActive && this.goblin.isVisible) {
        this.handleMiss();
        this.goblin.hide();
      }
    }, 1000);
  }

  handleCellClick(index) {
    if (!this.isGameActive) return;

    if (this.goblin.currentPosition === index && this.goblin.isVisible) {
      this.handleHit();
    } else {
      this.handleMiss();
    }
  }

  handleHit() {
    this.score++;
    this.goblin.hide();
    this.updateUI();
  }

  handleMiss() {
    this.misses++;
    this.updateUI();

    if (this.misses >= this.maxMisses) {
      this.endGame();
    }
  }

  updateUI() {
    this.scoreElement.textContent = `Score: ${this.score}`;
    this.missesElement.textContent = `Misses: ${this.misses}/${this.maxMisses}`;
  }

  endGame() {
    this.isGameActive = false;
    clearInterval(this.timer);

    this.modalMessage.textContent = `Game Over! Your score: ${this.score}`;
    this.modal.style.display = 'block';
  }

  restartGame() {
    this.score = 0;
    this.misses = 0;
    this.isGameActive = true;
    this.modal.style.display = 'none';
    this.goblin.hide();
    this.updateUI();
    this.startGame();
  }
}
