import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { authorize } from "../middleware/auth.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import { User, validateUser} from "../models/users.js";

 dotenv.config();

const router = express.Router();


router.get("/me" ,authorize, async(req,res) =>{
    try{
        const id = req.user._id
        const user = await User.find({_id:id});
        res.send(user)
    } catch (error){
        console.error("Error getting user",error);
        res.status(500).send("Internal server error");
    }
})

router.post("/", async (req, res) => {
    try{
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send("User already registered with this email");
        const user = new User(_.pick(req.body, ["name", "email", "password"]));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const result = await user.save();
        
        const token = result.generateToken();
        // Set the token in the response header
        res.header('x-auth-token',token).send(_.pick(result, ["_id", "name", "email"]));

    }   catch (error) {
        console.error("Error creating user:", error); 
        res.status(500).send("Internal server error");
    }
}

)

export default router;

