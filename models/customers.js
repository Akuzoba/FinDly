import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Joi from 'joi';



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

const validateCustomer = (customer) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    });
    return schema.validate(customer);
}

const Customer = mongoose.model('Customer', customerSchema);

export { Customer , customerSchema, validateCustomer };