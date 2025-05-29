import express from "express";
import { User, validateUser} from "../models/users.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).send("User already registered with this email");
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const result = await user.save();
        res.json(result);
    }   catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal server error");
    }
}

)

export default router;

