import mangoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mangoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}
).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

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

const Rental = mangoose.model('Rental', rentalSchema);
export { Rental, rentalSchema };