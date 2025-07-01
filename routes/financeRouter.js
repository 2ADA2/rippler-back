import {Router} from "express";
import FinanceController from "../controllers/financeController.js";
import {middleware} from "../middleware/middleware.js";

const financeRouter = new Router()

financeRouter.post('/operation', middleware, FinanceController.operation)

export default financeRouter;