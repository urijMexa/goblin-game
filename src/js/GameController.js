export class GameController {
  constructor(board, goblin) {
    this.board = board;
    this.goblin = goblin;
    this.score = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.isGameActive = true;
    this.timer = null;
    this.goblinTimer = null;
    this.wasMissed = false; // Флаг для отслеживания промахов

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
    this.wasMissed = false; // Сброс флага при каждом новом появлении гоблина

    if (!this.goblin.move()) {
      this.handleMiss();
      return;
    }

    // Очищаем предыдущий таймер гоблина
    if (this.goblinTimer) {
      clearTimeout(this.goblinTimer);
    }

    // Устанавливаем новый таймер для скрытия гоблина через 1 секунду
    this.goblinTimer = setTimeout(() => {
      if (this.isGameActive && this.goblin.isVisible) {
        // Если не было промаха (клика по пустой ячейке), то засчитываем пропуск
        if (!this.wasMissed) {
          this.handleMiss();
        }
        this.goblin.hide();
      }
    }, 1000);
  }

  handleCellClick(index) {
    if (!this.isGameActive) return;

    if (this.goblin.currentPosition === index && this.goblin.isVisible) {
      this.handleHit();
    } else {
      this.handleMissClick();
    }
  }

  handleHit() {
    // Очищаем таймер гоблина при попадании
    if (this.goblinTimer) {
      clearTimeout(this.goblinTimer);
    }

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

  handleMissClick() {
    // Если еще не было промаха для текущего гоблина, то увеличиваем
    if (!this.wasMissed) {
      this.wasMissed = true;
      this.handleMiss();
    }
  }

  updateUI() {
    this.scoreElement.textContent = `Score: ${this.score}`;
    this.missesElement.textContent = `Misses: ${this.misses}/${this.maxMisses}`;
  }

  endGame() {
    this.isGameActive = false;
    clearInterval(this.timer);

    if (this.goblinTimer) {
      clearTimeout(this.goblinTimer);
    }

    this.modalMessage.textContent = `Game Over! Your score: ${this.score}`;
    this.modal.style.display = 'block';
  }

  restartGame() {
    this.score = 0;
    this.misses = 0;
    this.isGameActive = true;
    this.wasMissed = false;

    clearInterval(this.timer);
    if (this.goblinTimer) {
      clearTimeout(this.goblinTimer);
    }

    this.modal.style.display = 'none';
    this.goblin.hide();
    this.updateUI();
    this.startGame();
  }
}
