import '../css/style.css';
import GameController from './GameController';

document.addEventListener('DOMContentLoaded', () => {
  const game = new GameController();
  game.init();
});
