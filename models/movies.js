import mongoose from "mongoose";
import dotenv from "dotenv";
import { genreSchema } from "./genre.js";



dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => { 
    console.error("Error connecting to MongoDB", err);
});

 

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
const Movie = mongoose.model('Movie', movieSchema);
export { Movie, movieSchema };
// const movies = [
//     { id: 1, title: 'Movie1', genre: 'Action', numberInStock: 10, dailyRentalRate: 2.5 },
//     { id: 2, title: 'Movie2', genre: 'Comedy', numberInStock: 5, dailyRentalRate: 3.0 },
//     { id: 3, title: 'Movie3', genre: 'Drama', numberInStock: 8, dailyRentalRate: 4.0 },
//     { id: 4, title: 'Movie4', genre: 'Action', numberInStock: 12, dailyRentalRate: 2.0 },
// ]
