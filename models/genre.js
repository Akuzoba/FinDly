import mongoose from "mongoose";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {    
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required()
    });
     return Joi.validate(genre,schema)
  
};

const Genre = mongoose.model('Genre', genreSchema);
export {Genre, genreSchema,validateGenre};