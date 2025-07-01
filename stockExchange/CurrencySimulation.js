class CurrencySimulation {
    price = 1000
    start = 1000
    priceHistory = []
    priceGeneralHistory = []
    min = 50
    max = 3000

    coef = 0.001
    bp = 5
    sp = 5
    base = 5
    bboost = 0
    sboost = 0
    stabtime = 0
    stabcoef = Infinity

    low = this.price
    high = this.price

    percents = 0

    date = new Date()

    startSimulation(stability, interval, date) {
        this.date = date
        this.stabcoef = 5 - stability/25
        console.log("simulation started")
        const simulationInterval = setInterval(() => {

            if(this.stabtime < 1){
                this.bp = this.base
                this.sp = this.base
                this.stabtime = 5 - stability/25
            }

            // date + 1h
            date.setSeconds(this.date.getSeconds() + 60)
            const d = this.date
            const formattedDate = d.toLocaleDateString() + " " + d.toLocaleTimeString()

            //exchange simulation

            //set price
            this.price = this.price + (Math.random() * this.bp - Math.random() * this.sp) * this.coef * 100
            if (this.bboost || this.sboost) {
                this.price = this.price + (Math.random()) * (this.bp - this.sp)
            }

            //low high
            this.high = Math.max(...this.priceHistory)
            this.low = Math.min(...this.priceHistory)
            if(!isFinite(this.high)){
                this.high = this.price
                this.low = this.price
            }

            //pull power
            this.bp = this.bp + ((5 - (Math.random() - this.bboost) * 10) * this.coef)
            this.sp = this.sp + ((5 - (Math.random() - this.sboost) * 10) * this.coef)


            //save data
            if (this.date.getMinutes() < 1) {
                this.priceHistory.push(this.price)
                this.percents = ((this.priceHistory[this.priceHistory.length - 1] - this.priceHistory[this.priceHistory.length - 2])
                    / this.priceHistory[this.priceHistory.length - 2] * 100).toFixed(2)
                if(isNaN(this.percents)){
                    this.percents = 0
                }
                this.percents = this.percents + "%"
            }
            if (this.date.getMinutes() < 1 || this.price < this.min || this.price > this.max) {
                this.sboost = 0
                this.bboost = 0
                if (this.price > this.max) {
                    this.sboost = 100 * this.coef - (this.max - this.min) / this.price * this.coef * 10
                    this.bboost = 0
                    this.bp = 5
                } else if (this.price < this.min) {
                    this.bboost = 100 * this.coef - this.price / (this.max - this.min) * this.coef * 10
                    this.sboost = 0
                    this.sp = 5
                } else {
                    if (stability < 100) {
                        const chance = Number(String(Math.random()).slice(5, 7)) - stability
                        if (chance < 0) {
                            if (Math.random() * 10 - 5 >= 0) {
                                this.bboost = Math.random() / 10
                            } else {
                                this.sboost = Math.random() / 10
                            }
                        }
                    }
                }
            }
            if (this.date.getHours() === 1 && this.priceHistory.length !== 0) {
                this.stabtime = this.stabtime - 1
                const high = this.high
                const low = this.low
                const open = this.priceHistory[0] || this.start
                const close = this.price
                const time = this.date.toLocaleDateString()
                this.priceGeneralHistory.push({
                    time, open, close, low, high
                })
                this.priceHistory = []
            }

        }, interval)
    }

    getData(req, res) {
        return {
            low:this.low,
            high:this.high,
            time:this.date.toLocaleDateString(),
            open:this.priceHistory[0] || this.start,
            close:this.price

        }
    }
    getHistroy(){
        return this.priceGeneralHistory
    }
}

export default new CurrencySimulation();
;