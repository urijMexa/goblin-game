export default class Board {
  constructor(size) {
    this.size = size;
    this.container = document.getElementById('game-container');
    this.cells = [];
  }

  drawBoard() {
    for (let i = 0; i < this.size ** 2; i += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.container.append(cell);
      this.cells.push(cell);
    }
  }
}
