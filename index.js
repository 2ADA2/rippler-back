import express from 'express';
import cors from 'cors';
import router from "./routes/router.js";
import mongoose from "mongoose";
import dataRouter from "./routes/dataRouter.js";
import StockConfig from "./stockExchange/stockConfig.js";
import financeRouter from "./routes/financeRouter.js";
import {Server} from "socket.io";
import {setupSocket} from "./socket/webSocketServer.js";
import * as http from "node:http";

const app = express();

const DB_URL = "mongodb+srv://artemdub29:d6k0vpI4VLk9aTmH@rippler.byjazc5.mongodb.net/?retryWrites=true&w=majority&appName=rippler"

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/", router);
app.use("/", dataRouter);
app.use("/", financeRouter);

const date = new Date(1990, 0, 1)
const server = http.createServer(app);

// webSocket server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

setupSocket(io);


async function startApp(){
    try{
        console.log("Connection")

        await mongoose.connect(DB_URL)
        console.log("MongoDB Connected!")
        console.log("starting simulation")

        StockConfig.start(date)
        console.log("simulation started")

        server.listen(port, () => {
            console.log(`Server started on port ${port}`);
        })
    } catch (e){
        console.log("error")
        console.log(e)
    }
}

startApp()