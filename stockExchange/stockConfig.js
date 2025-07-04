import CurrencySimulation from "./CurrencySimulation.js";

class SimulationExchange {
    Crypto = {
        "Rippler" : CurrencySimulation
    }

    start(date){
        // Crypto simulation
        this.Crypto.Rippler.startSimulation(100, 0.01, 1000, date)
    }

    getCryptoData(){
        return {
            "Rippler": this.Crypto.Rippler.getData()
        }
    }

    getCryptoHistory(){
        return {
            "Rippler": this.Crypto.Rippler.getHistroy()
        }
    }
}

export default new SimulationExchange();