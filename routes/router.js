import {Router} from "express";
import AuthController from "../controllers/authController.js";

const router = new Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/se/getData', (req, res) => {})
router.get('/ping', (req, res) => res.status(201).json({message: "pong"}))

export default router;