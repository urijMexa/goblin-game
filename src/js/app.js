import '../css/style.css';
import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
});