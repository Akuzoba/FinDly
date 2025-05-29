import mangoose from 'mongoose';
import Joi from 'joi';
import joiObjectid from 'joi-objectid';

const JoiObjectId = joiObjectid(Joi);


const rentalSchema = new mangoose.Schema({
    customer: {
        type: new mangoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mangoose.Schema({
            title: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const validateRental = (rental) => {
    const schema = Joi.object({
        customerId: JoiObjectId().required(),
        movieId: JoiObjectId().required(),
    });
    return Joi.validate(rental, schema);
}

const Rental = mangoose.model('Rental', rentalSchema);
export { Rental, rentalSchema, validateRental };