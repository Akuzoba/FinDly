import express from 'express';
import {Genre,validateGenre} from '../models/genre.js';
import { authorize } from '../middleware/auth.js';






const router = express.Router();





// var genres = [
//     { id: 1, name: 'Action' },
//     { id: 2, name: 'Comedy' },
//     { id: 3, name: 'Drama' },
//   ];
  router.get('/', (req, res) => {
    async function getGenres() {
        try {
            const genres = await Genre.find({}).sort({name:1});
            res.json(genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
            res.status(500).send('Internal server error');
        }
    }
    getGenres();
  });
  
  router.get('/:id', (req,res) => {
     const id = req.params.id;
        async function getGenre() {
            try {
                const genre = await Genre.find({_id:id});
                if (!genre) return res.status(404).send('the genre with the given ID was not found.');
                res.json(genre);
                console.log(genre)
            } catch (error) {
                console.error('Error fetching genre:', error);
                res.status(500).send('Internal server error');
            }
        }
  getGenre();
  });
  router.post('/',authorize,(req,res) => {
      async function createGenre() {
       
        try {
                 const { error } = validateGenre(req.body);
                if (error)return res.status(400).send(error.details[0].message);
        
                const g = new Genre({
                    name: req.body.name
                });
                
                  
                const result = await g.save();
                res.json(result);
            }
         catch (error) {
            console.error('Error creating genre:', error);
            res.status(500).send('Internal server error');
        
        }
       
      }
       createGenre();
  }
  );
  router.put('/:id', (req,res) => {
      const id = req.params.id;
      const name = req.body.name
      async function editGenre(){
        
        try{
           const results = await Genre.updateOne({_id:id},{$set:{name:name}});
           console.log(results)
            console.log('Genre updated successfully');
            res.status(200).send('Genre updated successfully');
      } catch (error) {
            console.error('Error updating genre:', error);
            res.status(500).send('Internal server error');
        }
    }
        editGenre();
  });
  router.delete('/:id', (req,res) => {
     const id = req.params.id;
      async function deleteGenre(){
        
        try{
           const result = await Genre.deleteOne({_id:id});
           console.log(result)
             res.status(200).send('Genre deleted successfully');
      } catch (error) {
            console.error('Error updating genre:', error);
            res.status(500).send('Internal server error');
        }
    }
        deleteGenre();
  });
  
  export default router;