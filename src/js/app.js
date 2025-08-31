import { Board } from './Board.js';
import { Goblin } from './Goblin.js';
import { GameController } from './GameController.js';
import '../css/style.css'; // Исправленный путь

document.addEventListener('DOMContentLoaded', () => {
  const board = new Board(4);
  const goblin = new Goblin(board);
  const game = new GameController(board, goblin);

  // Добавляем обработчики кликов на ячейки
  board.cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
      game.handleCellClick(index);
    });
  });
});
