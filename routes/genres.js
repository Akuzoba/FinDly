import express from 'express';
import Joi from 'joi';


const router = express.Router();

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
  router.get('/', (req, res) => {
      res.json(genres);
  });
  
  router.get('/:id', (req,res) => {
      const genre = genres.find(g => g.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('the genre with the given ID was not found.');
      res.json(genre);
  
  });
  router.post('/', (req,res) => {
      const genre = {
          id: genres.length + 1,
          name: req.body.name}
          const { error } = validateInput(genre);
          if (error) return res.status(400).send(error.details[0].message);       
      genres.push(genre);
      res.json(genre);
      }
  );
  router.put('/:id', (req,res) => {
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
  router.delete('/:id', (req,res) => {
      const genre = genres.find(g => g.id === parseInt(req.params.id));
      if (!genre) return res.status(404).send('the genre with the given ID was not found.');
      const index = genres.indexOf(genre);
      genres.splice(index, 1);
      res.json(genre);
  });
  
  export default router;