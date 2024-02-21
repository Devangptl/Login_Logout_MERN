import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        require: true,
    },
    img :{
        type : String,
    },
    email:{
        type : String,
        require: true,
        unique : true,
    },
    password:{
        type : String,
        require: true,
    },
    cpassword:{
        type : String,
        require: true,
    }


},{timestamps : true})

//bcrypt  middleware to hash the password before saving it in database

userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 12)
        this.cpassword = await bcrypt.hash(this.cpassword , 12)
    }

    next()
})

export const User = mongoose.model("User", userSchema)