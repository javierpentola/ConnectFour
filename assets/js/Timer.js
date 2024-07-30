export class Timer {
    constructor(duration, onTimeout) {
        this.duration = duration;
        this.onTimeout = onTimeout;
        this.timer = null;
    }

    start() {
        let remainingTime = this.duration;
        this.timer = setInterval(() => {
            remainingTime--;
            document.querySelector('.timer').textContent = `${remainingTime}s`;
            if (remainingTime <= 0) {
                clearInterval(this.timer);
                this.onTimeout();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }

    reset() {
        this.stop();
        document.querySelector('.timer').textContent = `${this.duration}s`;
    }
}
