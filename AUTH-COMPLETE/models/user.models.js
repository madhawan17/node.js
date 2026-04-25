import mongoose  from "mongoose";

const userschema = new.mongoose.Schema({
    name: {
        type:String,
        required:[true,"name is required"],
        unique:[true,"name must be unique"]
    },
    email: {
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password: {
        type:String,
        rewuired:[true,"password is required"]
    }
})
    
const usermodel = mongoose.model("users",userschema);

export default usermodel;