export class Grid {
    constructor() {
        this.directions = [
            [
                {x: 1, y: 1},
                {x: -1, y: -1},
            ],
            [
                {x: 1, y: 0},
                {x: -1, y: 0},
            ],
            [
                {x: 1, y: -1},
                {x: -1, y: 1},
            ],
            [
                {x: 0, y: -1},
                {x: 0, y: 1},
            ]
        ];
    }

    get isFull() {
        return this.discCount === this.totalSlots;
    }

    initialize(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.totalSlots = columns * rows;

        this.reset();
    }

    reset() {
        this.grid = Array.from({length: this.columns}, () => (
            Array.from({length: this.rows}, () => ({isEmpty: true}))
        ));

        this.dangerousDirection = null;
        this.discCount = 0;
        this.fullColumns = [];
        this.freeColumns = Array.from({length: this.columns}, (_, i) => i);
        this.columnHeights = Array(this.columns).fill(0);
    }

    addDisc(disc) {
        const {x, y, player} = disc;
        const slot = this.getSlot(x, y);
        
        slot.isEmpty = false;
        slot.player = player;
        
        this.lastDisc = disc;
        this.discCount++;
        this.columnHeights[x]++;

        if (y === this.rows - 1) {
            this.fullColumns.push(x);
            this.freeColumns.splice(this.freeColumns.indexOf(x), 1);
        }
    }

    getWinningDiscs() {
        const {x, y, player} = this.lastDisc;
        let winningDiscs = [];

        const isWinningLine = this.directions.some(direction => {
            winningDiscs = [{x, y}];

            for (const dir of direction) {
                for (let i = 1; i <= 3; i++) {
                    const newX = x + dir.x * i;
                    const newY = y + dir.y * i;
                    const slot = this.getSlot(newX, newY);

                    if (!slot || slot.isEmpty || slot.player !== player) break;

                    winningDiscs.push({x: newX, y: newY});
                }
            }

            if (player === 1 && winningDiscs.length === 3) {
                this.dangerousDirection = direction;
                this.dangerousDisc = this.lastDisc;
            }

            return winningDiscs.length >= 4;
        });

        return isWinningLine ? winningDiscs : false;
    }

    getNextAvailableRow(column) {
        return this.columnHeights[column];
    }

    getSlot(x, y) {
        return this.grid[x]?.[y];
    }

    getRandomColumn() {
        const randomIndex = Math.floor(Math.random() * this.freeColumns.length);
        return this.freeColumns[randomIndex];
    }

    getCPUColumn() {
        if (!this.dangerousDirection) return this.getRandomColumn();

        const {x: startX, y: startY} = this.dangerousDisc;
        
        for (const dir of this.dangerousDirection) {
            let i = 1;
            let slot, x, y;

            do {
                x = startX + dir.x * i;
                y = startY + dir.y * i;
                slot = this.getSlot(x, y);

                if (!slot || slot.player === 2) break;
                if (slot.player === 1 && this.getNextAvailableRow(x) === y) return x;

                i++;
            } while (slot.player === 1);
        }

        return this.getRandomColumn();
    }
}
