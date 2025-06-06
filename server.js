import express from 'express';
import logger from './logger.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import  User  from './routes/users.js';
import auth from './routes/auth.js';




dotenv.config();


const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(morgan('tiny'));

// API's endpoints 
app.use('/api/genres', genres);
app.use('/api/movies', movies); 
app.use('/api/customers', customers);
app.use('/api/rentals', rentals);
app.use('/api/users', User);
app.use('/api/auth',auth);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
