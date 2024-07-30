import { Grid } from './Grid.js';
import { View } from './View.js';
import { Timer } from './Timer.js';

class TimedGame {
    constructor() {
        this.isPlayer1 = true;
        this.starterWasPlayer1 = true;
        this.scores = [0, 0];
        this.turnDuration = 30;

        this.grid = new Grid();
        this.view = new View();
        this.timer = new Timer(this.turnDuration, this.onTimeout.bind(this));
    }

    init() {
        const nColumn = 7;
        const nRow = 6;

        this.grid.init(nColumn, nRow);
        this.view.init(this, nColumn, nRow, this.turnDuration);
        this.view.updateScores(this.scores);
    }

    reset() {
        this.isPlaying = false;
        this.isTimed = true;
        this.timer.stop();
        clearTimeout(this.turnTimeout);

        this.isPlayer1 = true;
        this.starterWasPlayer1 = true;
        this.scores = [0, 0];

        this.grid.reset();
        this.view.updateScores(this.scores);
        this.view.resetGrid();
    }

    start() {
        this.isPlaying = true;
        this.grid.reset();
        this.view.resetGrid();

        this.starterWasPlayer1 = !this.starterWasPlayer1;
        this.isPlayer1 = !this.starterWasPlayer1;

        this.newTurn();
    }

    newTurn() {
        this.timer.reset();
        this.timer.start();
        this.view.newTurn(this.isPlayer1, this.grid.fullColumns, this.grid.freeColumns);

        if (this.isAgainstCPU && !this.isPlayer1) {
            this.onColumnChoosed(this.grid.getCPUColumn());
        }
    }

    onTimeout() {
        this.onColumnChoosed(this.grid.getRandomColumn());
    }

    async onColumnChoosed(column) {
        if (!this.isPlaying || this.isDropping) return;

        clearTimeout(this.turnTimeout);
        this.timer.stop();

        await this.dropDisc(column);

        const winningDiscs = this.grid.getWinningDiscs();

        if (winningDiscs) return this.end(winningDiscs);
        else if (this.grid.isFull) return this.end(null, true);

        this.isPlayer1 = !this.isPlayer1;
        this.newTurn();
    }

    async dropDisc(column) {
        const row = this.grid.getNextSlotRow(column);
        const disc = { x: column, y: row, player: this.isPlayer1 ? 1 : 2 };

        this.grid.addDisc(disc);
        this.isDropping = true;

        await this.view.addDisc(disc);
        this.isDropping = false;
    }

    end(winningDiscs, isDraw = false) {
        clearTimeout(this.turnTimeout);
        this.timer.stop();

        this.isPlaying = false;
        this.view.end(winningDiscs, isDraw);

        if (isDraw) return;

        this.scores[this.isPlayer1 ? 0 : 1]++;
        this.view.updateScores(this.scores);
    }
}

function startTimedGame() {
    const game = new TimedGame();
    game.init();
    game.start();
}

// Hacer la función globalmente accesible
window.startTimedGame = startTimedGame;
