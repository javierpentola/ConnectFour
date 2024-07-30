import { selectElement as $ } from './helpers.js';

export class Navigation {
    constructor() {
        this.transitionScreen = $('.transition-screen');
    }

    initialize(game, data) {
        this.game = game;
        this.data = data;

        this.setupEventListeners();
    }

    setupEventListeners() {
        $('.btn-pvc').addEventListener('click', this.startGameCPU.bind(this));
        $('.btn-pvp').addEventListener('click', this.startGame.bind(this));
        $('.btn-timed').addEventListener('click', this.startTimedGame.bind(this));
        $('.btn-rules').addEventListener('click', this.showRules.bind(this));
        $('.btn-ok-rules').addEventListener('click', this.hideRules.bind(this));
        $('.btn-menu').addEventListener('click', this.pauseGame.bind(this));
        $('.btn-restart').addEventListener('click', this.restartGame.bind(this));
        $('.btn-play').addEventListener('click', this.playGame.bind(this));
        $('.btn-continue').addEventListener('click', this.unpauseGame.bind(this));
        $('.btn-restart-menu').addEventListener('click', this.restartGame.bind(this));
        $('.btn-quit').addEventListener('click', this.quitGame.bind(this));
        $('.ingame-menu').addEventListener('click', this.closeIngameMenu.bind(this));
    }

    fadeIn() {
        this.data.transitioning = true;
        return new Promise(resolve => this.transitionScreen.addEventListener('transitionend', resolve));
    }

    fadeOut() {
        delete this.data.transitioning;
    }

    showRules() {
        this.data.rules = true;
    }

    hideRules() {
        delete this.data.rules;
    }

    async startGame() {
        await this.fadeIn();

        this.data.ingame = true;
        this.data.state = 'start';
        delete this.data.pvc;
        this.game.isAgainstCPU = false;

        this.fadeOut();
    }

    async startGameCPU() {
        await this.fadeIn();

        this.data.ingame = true;
        this.data.state = 'start';
        this.data.pvc = true;
        this.game.isAgainstCPU = true;

        this.fadeOut();
    }

    async startTimedGame() {
        await this.fadeIn();

        this.data.ingame = true;
        this.data.state = 'start';
        this.data.timed = true;
        this.game.isTimed = true;

        this.fadeOut();
    }

    playGame() {
        this.game.start();
        this.data.state = 'playing';
    }

    async restartGame() {
        this.unpauseGame();
        await this.fadeIn();

        this.data.state = 'start';
        delete this.data.isDraw;

        this.game.reset();

        this.fadeOut();
    }

    pauseGame() {
        this.data.paused = true;
    }

    unpauseGame() {
        delete this.data.paused;
    }

    async quitGame() {
        await this.fadeIn();

        delete this.data.ingame;
        delete this.data.paused;
        delete this.data.isDraw;

        this.game.reset();

        this.fadeOut();
    }

    closeIngameMenu(event) {
        if (!event.target.classList.contains('ingame-menu__wrapper')) return;
        this.unpauseGame();
    }

    togglePause() {
        if (!this.data.ingame) return;

        if (this.data.paused) {
            this.unpauseGame();
        } else {
            this.pauseGame();
        }
    }
}
