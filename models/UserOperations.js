import mongoose from "mongoose";

const Operation = new mongoose.Schema({
    time: String,
    currency: String,
    currencyAmount: Number,
    euroAmount: Number,
    currencyPrice: Number,
})

const UserOperations = new mongoose.Schema({
    username: String,
    operations: [Operation],
})

export default mongoose.model('UserOperations', UserOperations)