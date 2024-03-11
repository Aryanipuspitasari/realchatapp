import {Schema, model} from "mongoose";

const messageSchema = new Schema({
    sender : { type: Schema.Types.ObjectId, ref: "User"},
    receiver : { type:Schema.Types.ObjectId, ref: "User"},
    message : String,
    timeStamp : { type: Date, default: Date.now }
}, {
    strictQuery: true,
    versionKey: false
});

export const Message = model("Message", messageSchema, "messages");
