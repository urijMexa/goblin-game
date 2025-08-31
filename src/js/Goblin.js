export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentPosition = null;
    this.isVisible = false;
    this.previousPosition = null;

    this.element = document.createElement('img');
    this.element.src = './img/goblin.png';
    this.element.className = 'goblin';
    this.element.style.display = 'none';

    document.body.appendChild(this.element);
  }

  move() {
    const availablePositions = [];

    for (let i = 0; i < this.board.cells.length; i++) {
      // Исключаем текущую позицию и предыдущую позицию
      if (i !== this.currentPosition && i !== this.previousPosition) {
        availablePositions.push(i);
      }
    }

    if (availablePositions.length === 0) {
      return false; // Нет доступных позиций
    }

    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const newPosition = availablePositions[randomIndex];

    this.previousPosition = this.currentPosition;
    this.currentPosition = newPosition;
    this.show();

    return true;
  }

  show() {
    if (this.currentPosition === null) return;

    const cell = this.board.cells[this.currentPosition];
    cell.appendChild(this.element);
    this.element.style.display = 'block';
    this.isVisible = true;
  }

  hide() {
    this.element.style.display = 'none';
    this.isVisible = false;

    // Удаляем гоблина из ячейки
    if (this.currentPosition !== null) {
      const cell = this.board.cells[this.currentPosition];
      if (cell.contains(this.element)) {
        cell.removeChild(this.element);
      }
    }
  }
}
