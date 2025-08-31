export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentPosition = null;
    this.isVisible = false;
    this.previousPosition = null;

    this.element = document.createElement('img');
    this.element.className = 'goblin';
    this.element.style.display = 'none';

    // Webpack обработает путь к изображению
    const goblinImage = require('../img/goblin.png');
    this.element.src = goblinImage;
  }

  move() {
    const availablePositions = [];

    for (let i = 0; i < this.board.cells.length; i++) {
      if (i !== this.currentPosition && i !== this.previousPosition) {
        availablePositions.push(i);
      }
    }

    if (availablePositions.length === 0) {
      for (let i = 0; i < this.board.cells.length; i++) {
        if (i !== this.currentPosition) {
          availablePositions.push(i);
        }
      }
    }

    if (availablePositions.length === 0) {
      return false;
    }

    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const newPosition = availablePositions[randomIndex];

    this.hide();
    this.previousPosition = this.currentPosition;
    this.currentPosition = newPosition;
    this.show();

    return true;
  }

  show() {
    if (this.currentPosition === null) return;

    const cell = this.board.cells[this.currentPosition];
    cell.append(this.element);
    this.element.style.display = 'block';
    this.isVisible = true;
  }

  hide() {
    this.element.style.display = 'none';
    this.isVisible = false;

    if (this.element.parentNode) {
      this.element.remove();
    }
  }
}
