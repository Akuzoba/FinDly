import express from 'express';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
 const router = express.Router();
 
 mongoose.connect(process.env.MONGO_URI).then(() => {    
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/',async (req, res) => {
    
        try {
            const customers = await Customer.find({}).sort({name:1});
            res.json(customers);
        } catch (error) {
            console.error('Error fetching customers:', error);
            res.status(500).send('Internal server error');
        }
    
  });
  
  router.get('/:id', async (req,res) => {
     const id = req.params.id;
        
            try {
                const customer = await Customer.find({_id:id});
                if (!customer) return res.status(404).send('the customer with the given ID was not found.');
                res.json(customer);
                console.log(customer)
            } catch (error) {
                console.error('Error fetching customer:', error);
                res.status(500).send('Internal server error');
            }
 
  });
  router.post('/',async (req,res) => {
      
        
        try {
                const g = new Customer({
                    name: req.body.name,
                    isGold: req.body.isGold,
                    phone: req.body.phone
                });
                
                  
                const result = await g.save();
                res.json(result);
            }
         catch (error) {
            console.error('Error creating customer:', error);
            res.status(500).send('Internal server error');
        
        }
       
      
  }
  );
  router.put('/:id',async (req,res) => {
      const id = req.params.id;
      const updates = req.body
      
        
        try{
           const results = await Customer.updateOne({_id:id},{$set:{...updates}});
            if (results.matchedCount === 0) {
                return res.status(404).send('Customer not found');
            }
            if (results.modifiedCount === 0) {
                return res.status(400).send('No changes made to the customer');
            }
           console.log(results)
            console.log('Customer updated successfully');
            res.status(200).send('Customer updated successfully');
      } catch (error) {
            console.error('Error updating customer:', error);
            res.status(500).send('Internal server error');
        }
    
  });
  router.delete('/:id', async (req,res) => {
     const id = req.params.id;
      
        
        try{
           const result = await Customer.deleteOne({_id:id});
           console.log(result)
             res.status(200).send('Customer deleted successfully');
      } catch (error) {
            console.error('Error updating customer:', error);
            res.status(500).send('Internal server error');
        }
    
        
  });
    export default router;