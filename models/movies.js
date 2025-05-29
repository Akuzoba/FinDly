import mongoose from "mongoose";
import dotenv from "dotenv";
import { genreSchema } from "./genre.js";




 

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre:{
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});
const validateMovie = (genre) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreID: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255),
        dailyRentalRate: Joi.number().min(0).max(50)
    });
     return Joi.validate(genre,schema)
  
};
const Movie = mongoose.model('Movie', movieSchema);
export { Movie, movieSchema, validateMovie };
// const movies = [
//     { id: 1, title: 'Movie1', genre: 'Action', numberInStock: 10, dailyRentalRate: 2.5 },
//     { id: 2, title: 'Movie2', genre: 'Comedy', numberInStock: 5, dailyRentalRate: 3.0 },
//     { id: 3, title: 'Movie3', genre: 'Drama', numberInStock: 8, dailyRentalRate: 4.0 },
//     { id: 4, title: 'Movie4', genre: 'Action', numberInStock: 12, dailyRentalRate: 2.0 },
// ]
