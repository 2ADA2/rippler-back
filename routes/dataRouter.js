import {Router} from "express";
import DataController from "../controllers/dataController.js";

const dataRouter = new Router()

dataRouter.get('/getUserData', DataController.getUserData)
dataRouter.get('/getStockData', DataController.getStockHistory)

export default dataRouter;