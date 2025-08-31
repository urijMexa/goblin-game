export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentPosition = null;
    this.isVisible = false;
    this.previousPosition = null;

    // Создаем элемент гоблина для каждой ячейки заранее
    this.elements = [];
    this.initElements();
  }

  initElements() {
    // Создаем элементы гоблина для всех ячеек и скрываем их
    for (let i = 0; i < this.board.cells.length; i++) {
      const element = document.createElement('img');
      element.src = './img/goblin.png';
      element.className = 'goblin';
      element.style.display = 'none';

      this.board.cells[i].appendChild(element);
      this.elements.push(element);
    }
  }

  move() {
    const availablePositions = [];

    // Собираем все доступные позиции, исключая текущую
    for (let i = 0; i < this.board.cells.length; i++) {
      if (i !== this.currentPosition) {
        availablePositions.push(i);
      }
    }

    if (availablePositions.length === 0) {
      return false;
    }

    // Выбираем случайную позицию из доступных
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const newPosition = availablePositions[randomIndex];

    // Скрываем предыдущего гоблина
    if (this.currentPosition !== null) {
      this.hide();
    }

    // Показываем нового гоблина
    this.currentPosition = newPosition;
    this.show();

    return true;
  }

  show() {
    if (this.currentPosition === null) return;

    this.elements[this.currentPosition].style.display = 'block';
    this.isVisible = true;
  }

  hide() {
    if (this.currentPosition !== null) {
      this.elements[this.currentPosition].style.display = 'none';
    }
    this.isVisible = false;
  }
}
