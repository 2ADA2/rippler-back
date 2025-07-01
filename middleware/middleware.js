import jwt from 'jsonwebtoken';
import {config} from "../config.js";


export function middleware(req, res, next) {
    if(req.method === 'OPTIONS') {
        next ()
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({"message": "Unauthorized"})
        }
        const decode = jwt.verify(token, config.secret)
        req.user = decode
        return next()
    } catch (e){
        console.log(e)
        return res.status(403).json({"message": "Unauthorized"})
    }
}