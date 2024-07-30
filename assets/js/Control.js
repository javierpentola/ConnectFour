export class Control {
    constructor() {
        this.selectedColumn = 0;
    }

    init(game, navigation, $columns) {
        this.game = game;
        this.navigation = navigation;
        this.$columns = $columns;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.$columns.forEach(($column, index) => {
            $column.addEventListener('pointerover', () => this.highlightColumn(index));
            $column.addEventListener('click', () => this.handleColumnClick(index));
        });

        addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handleColumnClick(columnIndex) {
        this.highlightColumn(columnIndex);
        this.confirmSelection();
    }

    handleKeyDown(event) {
        const { keyCode } = event;
        if (keyCode === 37) return this.changeColumnSelection(false);
        if (keyCode === 39) return this.changeColumnSelection(true);
        if (keyCode === 27) return this.navigation.togglePause();
        if (keyCode === 32) this.confirmSelection();
    }

    highlightColumn(columnIndex) {
        const $columns = this.$columns;
        $columns[this.selectedColumn].classList.remove('column--selected');
        $columns[columnIndex].classList.add('column--selected');
        this.selectedColumn = columnIndex;
    }

    changeColumnSelection(next) {
        if (!this.game.isPlaying || this.navigation.data.paused) return;

        const freeColumns = this.freeColumns;
        let currentIndex = freeColumns.indexOf(this.selectedColumn);

        if (next) {
            currentIndex = (currentIndex + 1) % freeColumns.length;
        } else {
            currentIndex = (currentIndex - 1 + freeColumns.length) % freeColumns.length;
        }

        this.highlightColumn(freeColumns[currentIndex]);
    }

    confirmSelection() {
        if (!this.game.isPlaying || this.navigation.data.paused) return;

        this.game.onColumnChoosed(this.selectedColumn);
    }

    newTurn(fullColumns, freeColumns) {
        fullColumns.forEach(columnIndex => {
            this.$columns[columnIndex].classList.add('column--full');
        });

        this.freeColumns = freeColumns;

        if (freeColumns.includes(this.selectedColumn)) {
            this.highlightColumn(this.selectedColumn);
        } else {
            this.highlightColumn(freeColumns[0]);
        }
    }
}
