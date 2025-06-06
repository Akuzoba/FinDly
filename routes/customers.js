import express from 'express';
import { Customer }from '../models/customers.js';
import { authorize } from '../middleware/auth.js';


 const router = express.Router();
 
 
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
  router.post('/',authorize,async (req,res) => {
      
        
        try {

            const { error } = Customer.validateCustomer(req.body);
            if (error) return res.status(400).send(error.details[0].message);
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
  router.put('/:id',authorize,async (req,res) => {
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
  router.delete('/:id',authorize, async (req,res) => {
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