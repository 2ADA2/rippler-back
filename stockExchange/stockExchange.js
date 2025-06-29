class StockExchange {
    price = 500
    start = 500
    priceHistory = []
    priceGeneralHistory = []
    min = 20
    max = 10000

    coef = 0.001
    bp = 5
    sp = 5
    base = 5
    bboost = 0
    sboost = 0

    percents = 0

    date = new Date(2000, 0, 1)


startSimulation(stability, interval)
{
    interval = interval * 1000
    console.log("simulation started")
    const simulationInterval = setInterval(() => {
        // date + 1h
        this.date.setSeconds(this.date.getSeconds() + 60)
        const d = this.date
        const formattedDate = d.toLocaleDateString() + " " + d.toLocaleTimeString()

        //exchange simulation

        //set price
        this.price = this.price + (Math.random()*this.bp-Math.random()*this.sp)*this.coef*100
        if(this.bboost ||this.sboost){
            this.price = this.price + (Math.random())*(this.bp-this.sp)
        }

        //pull power
        this.bp = this.bp + ((5- (Math.random()-this.bboost)*10)*this.coef)
        this.sp = this.sp + ((5- (Math.random()-this.sboost)*10)*this.coef)


        //save data
        if(this.date.getMinutes()<1){
            this.priceHistory.push(this.price)
            this.percents = ((this.priceHistory[this.priceHistory.length-1]-this.priceHistory[this.priceHistory.length-2])
                /this.priceHistory[this.priceHistory.length-2]*100).toFixed(2)+"%"
        }
        if(this.date.getMinutes()<1 || this.price<this.min || this.price>this.max){
            this.sboost = 0
            this.bboost = 0
            if(this.price>this.max){
                this.sboost = 100*this.coef-(this.max-this.min)/this.price*this.coef*10
                this.bboost = 0
                this.bp = 5
            } else if(this.price<this.min){
                this.bboost = 100*this.coef-this.price/(this.max-this.min)*this.coef*10
                this.sboost = 0
                this.sp = 5
            } else {
                if(stability<100){
                    const chance = Number(String(Math.random()).slice(5,7))-stability
                    if(chance<0){
                        if(Math.random()*10-5 >= 0){
                            this.bboost = Math.random()/10
                        }else{
                            this.sboost = Math.random()/10
                        }
                    }
                }
            }
        }
        if(this.date.getHours()===1 && this.priceHistory.length!==0){
            const high = Math.max(...this.priceHistory)
            const low = Math.min(...this.priceHistory)
            const open = this.priceHistory[0]||this.start
            const close = this.price
            const time = this.date.toLocaleDateString()
            this.priceGeneralHistory.push({
                time,open,close,low,high
            })
            this.priceHistory=[]
        }
        //monitoring
        if(this.date.getMinutes()===0){
            console.clear()
            console.log("Stock Exchange simulation:")
            console.log(`\ndate \t\t\t` + `price\t` + `bp\t` + `sp\t`)
            console.log(formattedDate + `\t$` + this.price.toFixed(2) +
                `\t`+ this.bp.toFixed(2) +`\t`+ this.sp.toFixed(2)+
                `\t`+this.percents +`\t`+this.bboost +`\t`+this.sboost, `\t`+ stability
            + `\n`+ JSON.stringify(this.priceGeneralHistory[this.priceGeneralHistory.length-1]))
        }

    }, 10)
}
getData(req, res)
{
    res.status(200).json({
        "data": {
            "name": "RPL",
            "price": "$22.14",
        }
    })
}

getAll(req, res)
{
    res.status(200).json({
        "data": {
            "RPL": {
                "name":
                    "RPL",
                "price":
                    "$22.14",
            }
        }
    })
}
}

export default new StockExchange();
;