import mongoose from 'mongoose';

// create a teammate schema
const teammateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image_url: { type: String }
});

// create a teammate model for schema
const Teammate = new mongoose.model('Teammate', teammateSchema);

export default Teammate;