import mongoose from 'mongoose';

// create a coffeeAccessory schema
const coffeeAccessorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subitems: [
        {
            title: { type: String, required: true },
            description: { type: String, default: '' },
            image_url: { type: String, default: null }
        }
    ],
    image_url: {
        type: String,
        default: null
    }
});

// create a accessory model for schema
const Accessory = new mongoose.model('Accessory', coffeeAccessorySchema);

export default Accessory;