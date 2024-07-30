import { Grid } from './Grid.js';
import { View } from './View.js';

class Game {
    constructor() {
        this.isPlayer1Turn = true;
        this.wasPlayer1Starter = true;
        this.scores = [0, 0];
        this.turnDuration = 30;

        this.grid = new Grid();
        this.view = new View();
    }

    initialize() {
        const columns = 7;
        const rows = 6;

        this.grid.initialize(columns, rows);
        this.view.initialize(this, columns, rows, this.turnDuration);
        this.view.updateScores(this.scores);
    }

    resetGame() {
        clearTimeout(this.turnTimeout);

        this.isPlayer1Turn = true;
        this.wasPlayer1Starter = true;
        this.scores = [0, 0];

        this.grid.reset();
        this.view.updateScores(this.scores);
        this.view.resetGrid();
    }

    startGame() {
        this.isPlaying = true;

        this.grid.reset();
        this.view.resetGrid();

        this.wasPlayer1Starter = !this.wasPlayer1Starter;
        this.isPlayer1Turn = !this.wasPlayer1Starter;

        this.startNewTurn();
    }

    startNewTurn() {
        const onTurnTimeout = this.selectRandomColumn.bind(this);
        this.turnTimeout = setTimeout(onTurnTimeout, this.turnDuration * 1000);

        this.view.startNewTurn(this.isPlayer1Turn, this.grid.fullColumns, this.grid.freeColumns);

        if (this.isAgainstCPU && !this.isPlayer1Turn) {
            this.handleColumnSelection(this.grid.getCPUColumn());
        }
    }

    selectRandomColumn() {
        this.handleColumnSelection(this.grid.getRandomColumn());
    }

    async handleColumnSelection(column) {
        if (!this.isPlaying || this.isDropping) return;

        clearTimeout(this.turnTimeout);

        await this.dropDiscInColumn(column);

        const winningDiscs = this.grid.getWinningDiscs();
        if (winningDiscs) {
            this.endGame(winningDiscs);
        } else if (this.grid.isFull()) {
            this.endGame(null, true);
        } else {
            this.isPlayer1Turn = !this.isPlayer1Turn;
            this.startNewTurn();
        }
    }

    async dropDiscInColumn(column) {
        const row = this.grid.getNextSlotRow(column);
        const disc = { x: column, y: row, player: this.isPlayer1Turn ? 1 : 2 };

        this.grid.addDisc(disc);

        this.isDropping = true;
        await this.view.addDisc(disc);
        this.isDropping = false;
    }

    endGame(winningDiscs, isDraw = false) {
        clearTimeout(this.turnTimeout);

        this.isPlaying = false;
        this.view.endGame(winningDiscs, isDraw);

        if (isDraw) return;

        this.scores[this.isPlayer1Turn ? 0 : 1]++;
        this.view.updateScores(this.scores);
    }
}

const game = new Game();
game.initialize();
