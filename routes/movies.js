import express from "express";
import { Genre } from "../models/genre.js";
import { Movie, validateMovie } from "../models/movies.js";
import { authorize } from "../middleware/auth.js";




const router = express.Router();


router.get('/', async (req, res) => {
    
        try {
            const movies = await Movie.find({}).sort({title:1});
            res.json(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            res.status(500).send('Internal server error');
        }
   
}
);
router.get('/:id',async (req,res) => {
    
    
        try {
            const id = req.params.id;
            const movie = await Movie.find({_id:id});
            if (!movie) return res.status(404).send('the movie with the given ID was not found.');
            res.json(movie);
            console.log(movie)
        } catch (error) {
            console.error('Error fetching movie:', error);
            res.status(500).send('Internal server error');
        }
    
}
);
router.post('/',authorize, async (req,res) => {
    
        try {
            const { error } = validateMovie(req.body);
            if(error) return res.status(400).send(error.details[0].message);

            const genre = await Genre.findById(req.body.genreID);
            if (!genre) return res.status(404).send('the genre with the given ID was not found.');
            const movie = new Movie({
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            });
            const result = await movie.save();
            res.send(result);
        } catch (error) {
            console.error('Error creating movie:', error);
            res.status(500).send('Internal server error');
        }
   
}
);
router.put('/:id',authorize, async (req,res) => {
    
   
        try {
            const id = req.params.id;
            const updates = req.body
            const movie = await Movie.findByIdAndUpdate(id, {
                ...updates
            }, { new: true });
            if (!movie) return res.status(404).send('the movie with the given ID was not found.');
            res.json(movie);
        } catch (error) {
            console.error('Error updating movie:', error);
            res.status(500).send('Internal server error');
        }
   
}
);

router.delete('/:id',authorize, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Movie.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'The movie with the given ID was not found.' });
    }
    
    res.json({ message: 'Movie deleted successfully', deletedId: id });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
