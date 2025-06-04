import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Joi from "joi";

dotenv.config();

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true,
        minlength: 4
    }
});

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_PRIVATE_KEY);
    return token;

};


const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(user);
}


const User = mongoose.model("User",userSchema);

export {User, userSchema, validateUser};
