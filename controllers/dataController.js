import jwt from "jsonwebtoken";
import {config} from "../config.js";
import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import StockConfig from "../stockExchange/stockConfig.js";
import UserOperations from "../models/UserOperations.js";

export class DataController{
    async getUserData(req, res){

        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({"message": "Unauthorized"})
        }

        const decode = jwt.verify(token, config.secret)
        if(!decode){
            return res.status(403).json({"message": "Unauthorized"})
        }
        const username = decode.username

        const user = await User.findOne({username})

        if(!user){
            return res.status(403).json({"message": "Unauthorized"})
        }
        const wallet = await Wallet.findOne({username})

        return res.status(200).json({
            username: username,
            imgUrl: user.imgUrl,
            wallet: wallet
        })
    }

    async getStockHistory(req, res){
        const data = StockConfig.getCryptoHistory()
        res.status(200).json({
            data
        })
    }
    async getOperations(req, res){
        const username = req.user.username
        const history = await UserOperations.findOne({username})
        res.status(200).json(history)
    }
}

export default new DataController();