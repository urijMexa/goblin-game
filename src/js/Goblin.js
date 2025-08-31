export class Goblin {
  constructor(board) {
    this.board = board;
    this.currentPosition = null;
    this.isVisible = false;
    this.previousPosition = null;

    // Создаем элементы гоблина для всех ячеек заранее
    this.elements = [];
    this.initElements();
  }

  initElements() {
    // Очищаем все ячейки от предыдущих гоблинов
    this.board.cells.forEach(cell => {
      cell.innerHTML = '';
    });

    // Создаем элементы гоблина для всех ячеек
    for (let i = 0; i < this.board.cells.length; i++) {
      const element = document.createElement('img');
      element.src = './img/goblin.png';
      element.className = 'goblin';
      this.board.cells[i].appendChild(element);
      this.elements.push(element);
    }
  }

  move() {
    const availablePositions = [];

    // Собираем все доступные позиции, исключая текущую
    for (let i = 0; i < this.board.cells.length; i++) {
      if (i !== this.currentPosition && i !== this.previousPosition) {
        availablePositions.push(i);
      }
    }

    // Если нет доступных позиций, разрешаем любую, кроме текущей
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

    console.log('Previous position:', this.previousPosition, 'Current position:', this.currentPosition, 'New position:', newPosition);

    // Скрываем предыдущего гоблина
    this.hide();

    // Показываем нового гоблина
    this.previousPosition = this.currentPosition;
    this.currentPosition = newPosition;
    this.show();

    return true;
  }

  show() {
    if (this.currentPosition === null) return;

    this.elements[this.currentPosition].classList.add('goblin-visible');
    this.isVisible = true;
  }

  hide() {
    if (this.currentPosition !== null) {
      this.elements[this.currentPosition].classList.remove('goblin-visible');
    }
    this.isVisible = false;
  }
}
