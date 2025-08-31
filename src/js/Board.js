export class Board {
  constructor(size) {
    this.size = size;
    this.cells = [];
    this.init();
  }

  init() {
    const boardElement = document.getElementById('board');
    boardElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  clear() {
    this.cells.forEach(cell => {
      cell.innerHTML = '';
    });
  }
}
