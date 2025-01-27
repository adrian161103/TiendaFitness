import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:20,
        minlength:2,
        trim:true,
        lowercase:true
        },
    lastName: {
        type:String,
        required:true,
        maxlength:20,
        minlength:2,
        trim:true,
        lowercase:true
        },
    email: {
        type:String,
        required:true,
        maxlength:30,
        minlength:6,
        trim:true,
        lowercase:true,
        match: /^\S+@\S+\.\S+$/,
        unique:true
        },
        age:{
            type: Number,
            required: true,
            min: 14,
            max: 110
            
        },
        registrationDate:{
            type:Date,
            default:Date.now()
        },
    password: {
        required: true,
        type:String,
      validate:{
        validator: function (value){
            return isGoodPassword(value);
        },
        message: "La contraseña no cumple con los requisitos, necesita un digito, una letra minuscula y una letra mayuscula y de 6 a 12 caracteres"
      }
    },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});


  

export default mongoose.model("user", userSchema);