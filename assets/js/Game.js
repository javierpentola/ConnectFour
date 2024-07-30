import { Grid } from './Grid.js';
import { View } from './View.js';

class Game {
    constructor() {
        this.isPlayer1Turn = true;
        this.wasPlayer1Starter = true;
        this.scores = [0, 0];
        this.turnDuration = 30; // Default turn duration in seconds
        this.grid = new Grid();
        this.view = new View();
        this.isTimedMode = false; // New mode
        this.isPuzzleMode = false; // New mode
        this.isTournamentMode = false; // New mode
        this.puzzleScenarios = this.loadPuzzleScenarios();
        this.tournamentBracket = [];
        this.currentMatch = 0;
    }

    initialize() {
        const columns = 7;
        const rows = 6;
        this.grid.initialize(columns, rows);
        this.view.initialize(this, columns, rows, this.turnDuration);
        this.view.updateScores(this.scores);
    }

    loadPuzzleScenarios() {
        return [
            { grid: [/* Example grid state */], solution: [/* Example solution moves */] }
        ];
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
        if (this.isTimedMode) {
            this.view.startTimer(this.turnDuration, this.handleTimeout.bind(this));
        }
        this.view.startNewTurn(this.isPlayer1Turn, this.grid.fullColumns, this.grid.freeColumns);
        if (this.isAgainstCPU && !this.isPlayer1Turn) {
            this.handleColumnSelection(this.grid.getCPUColumn());
        }
    }

    handleTimeout() {
        if (this.isPlayer1Turn) {
            this.handleColumnSelection(this.grid.getRandomColumn());
        } else {
            this.handleColumnSelection(this.grid.getRandomColumn());
        }
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
        const row = this.grid.getNextAvailableRow(column);
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

    startPuzzle(puzzleIndex) {
        this.isPlaying = true;
        this.isPuzzleMode = true;
        this.grid.loadScenario(this.puzzleScenarios[puzzleIndex].grid);
        this.view.loadScenario(this.puzzleScenarios[puzzleIndex].grid);
        this.solution = this.puzzleScenarios[puzzleIndex].solution;
    }

    handlePuzzleColumnSelection(column) {
        if (this.solution[0] === column) {
            this.solution.shift();
            if (this.solution.length === 0) {
                this.endPuzzle(true);
            }
        } else {
            this.endPuzzle(false);
        }
    }

    endPuzzle(isSolved) {
        this.isPlaying = false;
        if (isSolved) {
            alert("¡Puzzle resuelto!");
        } else {
            alert("Solución incorrecta. Inténtalo de nuevo.");
        }
    }

    startTournament(players) {
        this.isTournamentMode = true;
        this.tournamentBracket = this.generateBracket(players);
        this.currentMatch = 0;
        this.startNextMatch();
    }

    generateBracket(players) {
        return [
            { player1: players[0], player2: players[1] },
            { player1: players[2], player2: players[3] }
        ];
    }

    startNextMatch() {
        if (this.currentMatch >= this.tournamentBracket.length) {
            this.endTournament();
            return;
        }
        const match = this.tournamentBracket[this.currentMatch];
        this.isPlaying = true;
        this.grid.reset();
        this.view.resetGrid();
        this.view.showMatch(match);
    }

    endTournament() {
        alert("¡Torneo terminado!");
    }

    isMatchOver() {
        return false; // Implementar lógica para verificar si el partido ha terminado
    }
}

const game = new Game();
game.initialize();
