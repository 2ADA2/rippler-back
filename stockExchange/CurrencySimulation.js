class CurrencySimulation {
    price = 100;
    volatility = 0;

    date = new Date();
    currentCandle = null;
    history = [];
    timer = null;

    generateTick() {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const percentChange = Math.random() * this.volatility;
        return this.price * percentChange * direction;
    }

    startNewCandle() {
        const time = this.date.toISOString().split('T')[0]; // yyyy-mm-dd
        const close = this.currentCandle ?  this.currentCandle.close : this.price;
        this.currentCandle = {
            time:time,
            open: close,
            high: this.price,
            low: this.price,
            close: this.price,
        };
    }

    processTick() {
        const delta = this.generateTick();
        this.price += delta;

        if (!this.currentCandle) {
            this.startNewCandle();
        }


        this.date.setMinutes(this.date.getMinutes() + 60);

        if (this.date.getHours() < 1) {
            this.history.push({...this.currentCandle});
            this.startNewCandle();
        }

        this.currentCandle.high = Math.max(this.currentCandle.high, this.price);
        this.currentCandle.low = Math.min(this.currentCandle.low, this.price);
        this.currentCandle.close = this.price;

    }

    startSimulation(initialPrice = 1000, volatility = 0.02, date) {
        this.date = date
        this.price = initialPrice
        this.volatility = volatility

        if (this.timer) return;
    }

    // getters
    getData(req, res) {
        return this.currentCandle
    }

    getHistroy() {
        return this.history
    }
}

export default CurrencySimulation;
;