import express from 'express';
import dotenv from 'dotenv';
import { Rental } from '../models/rentals.js';
import { Customer } from '../models/customers.js';
import { Movie } from '../models/movies.js';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find({}).sort({ dateOut: -1 });
        res.json(rentals);
    } catch (error) {
        console.error('Error fetching rentals:', error);
        res.status(500).send('Internal server error');
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const rental = await Rental.findById(id);
        if (!rental) return res.status(404).send('The rental with the given ID was not found.');
        res.json(rental);
    } catch (error) {
        console.error('Error fetching rental:', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const customer = req.body.customerID;
        const movie = req.body.movieID;
        const customerData = await Customer.findById(customer);
        if(!customerData) return res.status(404).send("Customer cannot be found");
        const movieData = await Movie.findById(movie);
        if(!movieData) return res.status(404).send("Movie cannot be found");
        if (movieData.numberInStock === 0) return res.status(400).send('Movie not in stock');
        const rental = new Rental({
            customer: {
                _id: customerData._id,
                name: customerData.name,
                phone: customerData.phone
            },
            movie: {
                _id: movieData._id,
                title: movieData.title,
                dailyRentalRate: movieData.dailyRentalRate
            },
            
            rentalFee: req.body.rentalFee
        });
        const result = await rental.save();
        movieData.numberInStock--;
        await movieData.save();
        res.json(result);
    } catch (error) {
        console.error('Error creating rental:', error);
        res.status(500).send('Internal server error');
    }
});

router.put('/:id', async (req, res) => {

})

export default router;
