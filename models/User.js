import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: String,
    password: String,
    imgUrl: String,
})

export default mongoose.model('User', User)