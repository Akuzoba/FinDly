import express from 'express';
import logger from './logger.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import genres from './routes/genres.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(morgan('tiny'));
app.use('/api/genres', genres);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
