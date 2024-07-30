import { selectElement as $, repeat } from './helpers.js';
import { Navigation } from './Navigation.js';
import { Control } from './Control.js';

export class View {
    constructor() {
        this.data = $('body').dataset;
        this.timerData = $('.timer').dataset;
        this.score1Data = $('.score1').dataset;
        this.score2Data = $('.score2').dataset;
        
        this.navigation = new Navigation();
        this.control = new Control();
    }

    initialize(game, numColumns, numRows, turnDuration) {
        const { columns, slots } = this.createGrid(numColumns, numRows);

        this.slots = slots;
        this.columns = columns;
        this.turnDuration = turnDuration;
        
        this.navigation.initialize(game, this.data);
        this.control.initialize(game, this.navigation, columns);
    }

    createGrid(numColumns, numRows) {
        const columns = [], slots = [];
        const gridWrapper = $('.grid__wrapper');

        repeat(numColumns, () => {
            const columnElement = document.createElement('div');
            columnElement.classList.add('column');

            repeat(numRows, () => {
                const slotElement = document.createElement('div');
                slotElement.classList.add('slot');

                slots.push(slotElement);
                columnElement.appendChild(slotElement);
            });

            columns.push(columnElement);
            gridWrapper.appendChild(columnElement);
        });

        return { columns, slots };
    }

    startNewTurn(isPlayer1, fullColumns, freeColumns) {
        this.data.player = isPlayer1 ? 1 : 2;

        this.timerData.value = this.turnDuration;
        this.timerInterval = setInterval(() => {
            this.timerData.value--;
        }, 1000);

        this.control.startNewTurn(fullColumns, freeColumns);
    }

    getSlot(x, y) {
        const index = x * 6 + 5 - y;
        return this.slots[index];
    }

    async addDisc(disc) {
        clearInterval(this.timerInterval);
        
        this.data.dropping = true;

        const slotElement = this.getSlot(disc.x, disc.y);
        slotElement.style.translate = `0 -${(6 - disc.y) * 100}%`;
        slotElement.offsetWidth; // Trigger reflow
        slotElement.classList.add(`slot--p${disc.player}`);
        slotElement.style.removeProperty('translate');

        await new Promise(resolve => slotElement.addEventListener('transitionend', resolve));

        delete this.data.dropping;
    }

    resetGrid() {
        clearInterval(this.timerInterval);
        
        this.columns.forEach(column => column.className = 'column');
        this.slots.forEach(slot => slot.className = 'slot');
    }

    endGame(winningDiscs, isDraw) {
        clearInterval(this.timerInterval);
        
        this.data.state = 'end';
        this.data.isDraw = isDraw;

        if (isDraw) return;
        
        winningDiscs.forEach(disc => {
            this.getSlot(disc.x, disc.y).classList.add('slot--win');
        });
    }

    updateScores(scores) {
        this.score1Data.value = scores[0];
        this.score2Data.value = scores[1];
    }
}
