import mongoose from 'mongoose';
import Grinder from '../models/coffeeGrinderModel.js';

// add a grinder
const addGrinder = async (req, res) => {
    let { title, subItems, description, additional_info, details } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/grinder/${req.file.filename}` : null;

    title = title?.trim();
    description = description?.trim();

    try {
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newGrinder = new Grinder({
            title,
            subItems,
            description,
            additional_info,
            details,
            image_url: imageUrl
        });

        const savedGrinder = await newGrinder.save();

        return res.status(201).json(savedGrinder);
    } catch (error) {
        console.error('Error creating grinder:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// get all grinders
const getGrinders = async (req, res) => {
    try {
        const grinders = await Grinder.find();

        return res.status(200).json(grinders);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// edit an grinder info
const editGrinderInfo = async (req, res) => {
    try {
        const { _id } = req.params;
        const updates = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid grinder ID' });
        }

        const updatedGrinder = await Grinder.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedGrinder) {
            return res.status(404).json({ error: 'Grinder not found' });
        }

        return res.json(updatedGrinder);
    } catch (error) {
        console.error('Error updating grinder:', error);
        return res.status(500).json({ error: 'Server error while updating grinder' });
    }
};


// remove an grinder
const removeGrinder = async (req, res) => {
    const { _id } = req.params;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid grinder ID.' });
        }

        const grinder = await Grinder.findById(_id);

        if (!grinder) {
            return res.status(404).json({
                error: 'Grinder not found.',
                message: `Grinder with ID ${_id} was not found.`
            });
        }

        await Grinder.findByIdAndDelete(_id);

        return res.status(200).json({ message: `"${grinder._id}" deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export {
    addGrinder,
    getGrinders,
    editGrinderInfo,
    removeGrinder
};