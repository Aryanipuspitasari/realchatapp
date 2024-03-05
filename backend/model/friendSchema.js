import { Schema, model } from "mongoose";

const friendSchema = new Schema({
    friendName : String,
},{
    strictQuery: true,
    versionKey: false
});

const Friend = model("Friend", friendSchema, "friends");
export default Friend;