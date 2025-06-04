import express from "express";
import dotenv from "dotenv";
import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../models/users.js";
import jwt from "jsonwebtoken";
dotenv.config();

const router =  express.Router();

router.post("/",async (req,res) =>{
  try{
    //   const { error } = validateUser(req.body) 
    //   if (error) return res.status(400).send(error.details[0].massage)
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password");
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    const token = user.generateToken();
    // Set the token in the response header
    res.send(token);
  } catch (err) {
    console.log("Error authenticating user",err);
  }

}

);

// const validateUser = (req) =>{
//     const schema = Joi.object({
//          email: Joi.string().email().required(),
//          password: Joi.string().min(4).required()
//     });
//     return Joi.validate(req, schema);
// }

export default router;