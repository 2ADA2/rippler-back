import express from 'express';
import cors from 'cors';
import router from "./routes/router.js";
import StockExchange from "./stockExchange/stockExchange.js";

const app = express();

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", router);



app.listen(port, () => {
    StockExchange.startSimulation(100, 1);
    console.log(`Server started on port ${port}`);
})