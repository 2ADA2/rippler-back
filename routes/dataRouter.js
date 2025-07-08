import {Router} from "express";
import DataController from "../controllers/dataController.js";
import {middleware} from "../middleware/middleware.js";

const dataRouter = new Router()
dataRouter.get('/getUserData', DataController.getUserData)
dataRouter.get('/getStockData', DataController.getStockHistory)
dataRouter.get('/getOperations',middleware, DataController.getOperations)

export default dataRouter;