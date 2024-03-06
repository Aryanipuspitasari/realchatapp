import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username : { type : String, required : true, unique : true},
    email: { type: String, required: true, unique: true },
    password : {type: String, required: true}
}, {
    strictQuery: true,
    versionKey: false
});

userSchema.methods.toJSON = function(){
    const user = this.toObject();
    delete user._id;
    delete user.password;
    delete user.email;
    return user;
}

const User = model("User", userSchema, "users");
export default User;