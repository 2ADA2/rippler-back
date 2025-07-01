import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import {config} from "../config.js";
import Wallet from "../models/Wallet.js";
import {staticWallet} from "../utils/staticData.js";


const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    }

    return jwt.sign(payload,config.secret, {expiresIn: "24h"})
}

class AuthController {
    async login(req, res) {
        try{
            let {username, password} = req.body
            const user = await User.findOne({username})
            if(!user){
                return res.status(400).json({"message": "No such user"})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
                return res.status(400).json({"message": "Invalid password"})
            }

            const token = generateAccessToken(user._id, user.username)
            return res.status(200).json({token})
        } catch(err){
            console.log(err)
            res.status(400).json({"message": "Login error"})
        }
    }

    async register(req, res) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({...errors})
            }
            let {username, password} = req.body
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({"message": "Already exists"})
            }
            password = await bcrypt.hash(password, 7)
            const imgUrl = ""
            await User.create({
                username,
                password,
                imgUrl
            }) 

            await Wallet.create({
                username,
                wallet:staticWallet
            })

            return res.status(200).json({ message: "Register successfully" })
        } catch(err){
            console.log(err)
            res.status(400).json({"message": "Registration error"})
        }
    }
}

export default new AuthController();