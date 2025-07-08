import stockConfig from "../stockExchange/stockConfig.js";
import Wallet from "../models/Wallet.js";
import UserOperations from "../models/UserOperations.js";

export class FinanceController {
    async operation(req, res) {
        try {
            let { type, count, currency } = req.body;
            const username = req.user.username;

            count = Number(count);

            const data = stockConfig.getCryptoData();
            let walletData = await Wallet.findOne({ username });

            let id = 0
            let walletCount = 0

            const euro = walletData.wallet[0].count

            for (let i in walletData.wallet){
                if (walletData.wallet[i].name === currency){
                    id = i
                    walletCount = walletData.wallet[i].count
                }
            }

            if(type === "sell"){
                const operationSumm = count * data[currency].close

                if(walletCount-count < 0) {
                    return res.status(400).json({"message": "No enough currency"})
                }

                walletData.wallet[id].count = walletCount - count

                walletData.wallet[0].count = euro + operationSumm

                await Wallet.updateOne({username}, walletData)

                const operations = await UserOperations.findOne({username})
                let history = []

                const time = await stockConfig.getTime()
                if(!operations){
                    history = [
                        {
                            time: time,
                            type: type,
                            currency: currency,
                            currencyAmount: count,
                            euroAmount: operationSumm,
                            currencyPrice: data[currency].close,
                        }
                    ]
                    await UserOperations.create({
                        username:username,
                        operations:history
                    })
                } else {
                    history = operations.operations
                    if(history.length === 100){
                        history = history.slice(1,history.length)
                    }
                    history.push({
                        time: time,
                        type: type,
                        currency: currency,
                        currencyAmount: count,
                        euroAmount: operationSumm,
                        currencyPrice: data[currency].close,
                    })
                    await UserOperations.updateOne({username}, operations)
                }

                res.status(200).json({
                    wallet: walletData.wallet,
                    price:data.price,
                    count:count,
                    euro:operationSumm,
                    operations:history
                })
            }else{
                const operationSumm = count

                if(euro - count < 0){
                    return res.status(400).json({"message": "No enough money"})
                }

                walletData.wallet[id].count = walletCount +  count / data[currency].close
                walletData.wallet[0].count = euro - count

                await Wallet.updateOne({username}, walletData)

                const operations = await UserOperations.findOne({username})
                let history = []

                const time = await stockConfig.getTime()
                if(!operations){
                    history = [
                        {
                            time: time,
                            type: type,
                            currency: currency,
                            currencyAmount: count / data[currency].close,
                            euroAmount: count,
                            currencyPrice: data[currency].close,
                        }
                    ]
                    await UserOperations.create({
                        username:username,
                        operations:history
                    })
                } else {
                    history = operations.operations
                    if(history.length === 100){
                        history = history.slice(1,history.length)
                    }
                    history.push({
                        time: time,
                        type: type,
                        currency: currency,
                        currencyAmount: count / data[currency].close,
                        euroAmount: count,
                        currencyPrice: data[currency].close,
                    })
                    await UserOperations.updateOne({username}, operations)
                }

                res.status(200).json({
                    wallet: walletData.wallet,
                    price:data.price,
                    count:count,
                    euro:operationSumm,
                    operation:history
                })

            }
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Wrong credentials" });
        }
    }
}


export default new FinanceController();