import goblinImg from '../img/goblin.png';

export default class Goblin {
  constructor(board) {
    this.board = board;
    this.element = null;
    this.currentPosition = -1;
  }

  static createElement() {
    const el = document.createElement('img');
    el.src = goblinImg;
    el.classList.add('goblin');
    el.alt = 'Goblin character';
    return el;
  }

  place() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.board.cells.length);
    } while (newPosition === this.currentPosition);

    if (this.currentPosition !== -1) {
      this.board.cells[this.currentPosition].innerHTML = '';
    }

    this.currentPosition = newPosition;
    this.board.cells[this.currentPosition].append(this.element);
  }

  remove() {
    if (this.currentPosition !== -1) {
      this.board.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = -1;
    }
  }
}
