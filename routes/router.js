import {Router} from "express";
import AuthController from "../controllers/authController.js";
import {check} from "express-validator";
import {middleware} from "../middleware/middleware.js";

const router = new Router()

router.post('/login', AuthController.login)

router.post('/register', [
    check("username", "Password must be longer than 3 symbols").isLength({min:4}),
    check("password", "Password must be longer than 5 symbols").isLength({min:6}),
], AuthController.register)
router.get('/ping', middleware, (req, res) => res.status(201).json({message: "pong"}))

export default router;