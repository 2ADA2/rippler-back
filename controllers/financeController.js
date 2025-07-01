import jwt from "jsonwebtoken";
import {config} from "../config.js";
import stockConfig from "../stockExchange/stockConfig.js";
import Wallet from "../models/Wallet.js";

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
            const operationSumm = count * data[currency].price

            if(type === "sell"){
                if(walletCount-count < 0) {
                    return res.status(400).json({"message": "No enough currency"})
                }

                walletData.wallet[id].count = walletCount - count

                walletData.wallet[0].count = euro + operationSumm
                const response = await Wallet.updateOne({username}, walletData)
                res.status(200).json({
                    wallet: walletData.wallet,
                    price:data.price,
                    count:count,
                    euro:operationSumm,
                    response
                })
            }else{
                if(euro - operationSumm < 0){
                    res.status(400).json({"message": "No enough money"})
                }

                walletData.wallet[id].count = walletCount + count
                walletData.wallet[0].count = euro - operationSumm

                const response = await Wallet.updateOne({username}, walletData)
                res.status(200).json({
                    wallet: walletData.wallet,
                    price:data.price,
                    count:count,
                    euro:operationSumm,
                    response
                })
            }
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Wrong credentials" });
        }
    }
}


export default new FinanceController();