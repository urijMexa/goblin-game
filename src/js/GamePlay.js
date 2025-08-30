import goblinImg from '../img/goblin.png';

export default class GamePlay {
  constructor(board) {
    this.board = board;
    this.character = null;
    this.currentPosition = -1;
    this.interval = null;
  }

  createCharacter() {
    const characterEl = document.createElement('img');
    characterEl.src = goblinImg;
    characterEl.classList.add('goblin');
    characterEl.alt = 'Goblin character';
    this.character = characterEl;
  }

  startGame() {
    this.createCharacter();
    this.interval = setInterval(() => {
      this.moveCharacter();
    }, 1000);
  }

  stopGame() {
    clearInterval(this.interval);
    if (this.currentPosition !== -1) {
      this.board.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = -1;
    }
  }

  moveCharacter() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.board.cells.length);
    } while (newPosition === this.currentPosition);

    if (this.currentPosition !== -1) {
      this.board.cells[this.currentPosition].innerHTML = '';
    }

    this.currentPosition = newPosition;
    this.board.cells[this.currentPosition].append(this.character);
  }

  removeCharacter() {
    if (this.currentPosition !== -1) {
      this.board.cells[this.currentPosition].innerHTML = '';
      this.currentPosition = -1;
    }
  }
}
