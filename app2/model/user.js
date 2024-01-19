import mongoose, { Schema } from "mongoose";

const useModel = new Schema({
    name: String,
    age: Number
})

const userModel = mongoose.model('user', useModel)

export default userModel
