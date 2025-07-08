import CurrencySimulation from "./CurrencySimulation.js";

class SimulationExchange {
    Crypto = {
        "Rippler" : new CurrencySimulation(),
        "Innovate" : new CurrencySimulation(),
        "Kilowatt" : new CurrencySimulation(),
        "ADA" : new CurrencySimulation(),
    }

    start(date){
        // Crypto simulation
        this.Crypto.Rippler.startSimulation(100, 0.01, new Date(date))
        this.Crypto.Innovate.startSimulation(20, 0.005, new Date(date))
        this.Crypto.Kilowatt.startSimulation(1000, 0.1, new Date(date))
        this.Crypto.ADA.startSimulation(50000, 0.005, new Date(date))

        setInterval(() => {
            this.Crypto.Rippler.processTick()
            this.Crypto.Innovate.processTick()
            this.Crypto.Kilowatt.processTick()
            this.Crypto.ADA.processTick()
        }, 1000)
    }

    getCryptoData(){
        return {
            "Rippler": this.Crypto.Rippler.getData(),
            "Innovate" : this.Crypto.Innovate.getData(),
            "Kilowatt" : this.Crypto.Kilowatt.getData(),
            "ADA" : this.Crypto.ADA.getData(),
        }
    }

    getCryptoHistory(){
        return {
            "Rippler": this.Crypto.Rippler.getHistroy(),
            "Innovate" : this.Crypto.Innovate.getHistroy(),
            "Kilowatt" : this.Crypto.Kilowatt.getHistroy(),
            "ADA" : this.Crypto.ADA.getHistroy(),
        }
    }

    getTime(){
        return this.Crypto.Rippler.currentCandle.time
    }
}

export default new SimulationExchange();