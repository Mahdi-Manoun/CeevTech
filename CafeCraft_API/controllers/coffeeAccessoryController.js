import mongoose from 'mongoose';
import Accessory from '../models/coffeeAccessoryModel.js';

// add a coffee accessory
const addAccessory = async (req, res) => {
    try {
        let { title, subitems, image_url } = req.body;
        const imageUrl = req.file ? `http://localhost:5000/uploads/accessory/${req.file.filename}` : null;

        // Validate and clean data
        title = title?.trim();

        if (!title) {
            return res.status(400).json({ error: 'Title is required.' });
        }

        const newAccessory = new Accessory({
            title,
            subitems,
            image_url: imageUrl
        });

        const savedAccessory = await newAccessory.save();
        return res.status(201).json(savedAccessory);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// get all coffee accessories
const getAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.find();

        return res.status(200).json(accessories);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// edit an coffee accessory info
const editAccessoryInfo = async (req, res) => {
    try {
        const { _id } = req.params;
        let updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid accessory ID' });
        }

        const updatedAccessory = await Accessory.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedAccessory) {
            return res.status(404).json({ error: 'Accessory not found' });
        }

        return res.json(updatedAccessory);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// remove an coffee accessory
const removeAccessory = async (req, res) => {
    const { _id } = req.params;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid accessory ID.' });
        }

        const accessory = await Accessory.findById(_id);

        if (!accessory) {
            return res.status(404).json({
                error: 'Accessory not found.',
                message: `Accessory with ID ${_id} was not found.`
            });
        }

        await Accessory.findByIdAndDelete(_id);

        return res.status(200).json({ message: `"${accessory._id}" deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export {
    addAccessory,
    getAccessories,
    editAccessoryInfo,
    removeAccessory
};