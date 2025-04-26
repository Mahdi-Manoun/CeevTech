import mongoose from 'mongoose';
import Teammate from '../models/teammateModel.js';

// add a teammate
const addTeammate = async (req, res) => {
    let { name, role } = req.body;
    const pathUrl = 'http://localhost:5000/uploads/teammate';
    const imageUrl = req.file ? `${pathUrl}/${req.file.filename}` : `${pathUrl}/default/default-user.png`;

    name = name?.trim();
    role = role?.trim();
    try {
        if (!name || !role) return res.status(400).json({ error: 'All fields are required.' })

        const newTeammate = new Teammate({
            name,
            role,
            image_url: imageUrl
        });

        await newTeammate.save();

        return res.status(201).json({ message: 'Teammate added successfully!', teammate: newTeammate });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// get all teammates
const getTeammates = async (req, res) => {
    try {
        const teammates = await Teammate.find();

        return res.status(200).json(teammates);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// edit an teammate info
const editTeammateInfo = async (req, res) => {
    const { _id } = req.params;
    const { name, role } = req.body;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({
                error: 'Invalid ID format.',
                message: 'The provided teammate ID is not valid.'
            });
        }

        const teammate = await Teammate.findById(_id);
        if (!teammate) {
            return res.status(404).json({
                error: 'Not found.',
                message: `Teammate with ID ${_id} doesn't exist.`
            });
        }

        if (req.file) {
            teammate.image_url = `http://localhost:5000/uploads/teammate/${req.file.filename}`;
            console.log('New image path set:', teammate.image_url);
        }

        if (name) teammate.name = name.trim();
        if (role) teammate.role = role.trim();

        const updatedTeammate = await teammate.save();

        console.log('Uploaded file:', req.file);

        return res.status(200).json({
            success: true,
            message: 'Teammate updated successfully!',
            data: updatedTeammate
        });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// remove an teammate
const removeTeammate = async (req, res) => {
    const { _id } = req.params;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid teammate ID.' });
        }

        const teammate = await Teammate.findById(_id);

        if (!teammate) {
            return res.status(404).json({
                error: 'Teammate not found.',
                message: `Teammate with ID ${_id} was not found.`
            });
        }

        await Teammate.findByIdAndDelete(_id);

        return res.status(200).json({ message: `"${teammate._id}" deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export {
    addTeammate,
    getTeammates,
    editTeammateInfo,
    removeTeammate
};