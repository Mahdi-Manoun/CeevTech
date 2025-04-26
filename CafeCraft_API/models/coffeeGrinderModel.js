import mongoose from 'mongoose';

// create a coffeeGrinder schema
const coffeeGrinderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subItems: {
        type: [
            {
                item_id: { type: mongoose.Schema.Types.ObjectId },
                title: { type: String, required: true },
                image_url: { type: String, default: null }
            }
        ],
        default: []
    },
    description: {
        type: String,
        default: ''
    },
    additional_info: {
        type: Map,
        of: String,
        default: {}
    },
    details: { type: [String] },
    image_url: {
        type: String,
        default: null
    }
});

// create a grinder model for schema
const Grinder = new mongoose.model('Grinder', coffeeGrinderSchema);

export default Grinder;