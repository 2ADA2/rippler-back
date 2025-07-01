import mongoose from "mongoose";

const WalletEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    count: { type: Number, required: true },
    coefficient: { type: Number, required: true },
    code: { type: Number, required: true },
}, { _id: false });

const Wallet = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    wallet: {
        type: [WalletEntrySchema], // массив объектов с описанной структурой
        default: [],
    }
})

export default mongoose.model('Wallet', Wallet)