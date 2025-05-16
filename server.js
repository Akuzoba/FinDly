import express from 'express';
import Joi from 'joi';
import logger from './logger.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger);
app.use(morgan('tiny'));
const validateInput = (results) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { error } = schema.validate(results);
    if (error) {
        return error;
    }
};
var genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Comedy' },
  { id: 3, name: 'Drama' },
];
app.get('/api/genres', (req, res) => {
    res.json(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given ID was not found.');
    res.json(genre);

});
app.post('/api/genres', (req,res) => {
    const genre = {
        id: genres.length + 1,
        name: req.body.name}
        const { error } = validateInput(genre);
        if (error) return res.status(400).send(error.details[0].message);       
    genres.push(genre);
    res.json(genre);
    }
);
app.put('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given ID was not found.');
    const g = {
        id: genre.id,
        name: req.body.name
    }   
    const { error } = validateInput(g);
    if (error) return res.status(400).send(error.details[0].message);       
    genre.name = req.body.name;
    res.json(genre);
});
app.delete('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('the genre with the given ID was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.json(genre);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
