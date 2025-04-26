import mongoose from 'mongoose';
import Course from '../models/courseModel.js';

// add a course
const addCourse = async (req, res) => {
    let { title, subtitle, abbreviation, overview, objectives, topics, structure, target_audience } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/coffee/${req.file.filename}` : null;

    title = title?.trim();
    subtitle = subtitle?.trim();
    abbreviation = abbreviation?.trim();
    overview = overview?.trim();

    try {
        let emptyFields = [];

        if (!title) emptyFields.push('title');
        if (!abbreviation) emptyFields.push('abbreviation');
        if (!overview) emptyFields.push('overview');

        if (!objectives) emptyFields.push('objectives');
        if (!structure) emptyFields.push('structure')
        if (!target_audience) emptyFields.push('target_audience')

        if (emptyFields.length > 0) {
            return res.status(400).json({ error: `Fields "${emptyFields.join(', ')}" should not be empty or invalid.` });
        }

        const newCourse = new Course({
            title,
            subtitle,
            abbreviation,
            overview,
            objectives,
            topics,
            structure,
            target_audience,
            image_url: imageUrl
        });

        await newCourse.save();

        return res.status(201).json({ message: 'Course added successfully!', newCourse });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// edit an course info
const editCourseInfo = async (req, res) => {
    const { _id } = req.params;
    let { title, subtitle, abbreviation, overview, objectives, topics, structure, target_audience } = req.body;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid course ID.' });
        }

        const course = await Course.findById(_id);

        if (!course) {
            return res.status(404).json({
                error: 'Course not found',
                message: `Course with ID ${_id} was not found.`
            });
        }

        if (req.file) {
            course.image_url = `http://localhost:5000/uploads/course/${req.file.filename}`;
            console.log('New image path set:', course.image_url);
        }

        let invalidFields = [];
        if (objectives && !Array.isArray(objectives)) invalidFields.push('Objectives');
        if (structure && !Array.isArray(structure)) invalidFields.push('structure');
        if (target_audience && !Array.isArray(target_audience)) invalidFields.push('target_audience');

        if (invalidFields.length > 0) {
            return res.status(400).json({ error: `"${invalidFields.join(', ')}" must be an array.` });
        }

        course.title = title?.trim() || course.title;
        course.subtitle = subtitle?.trim() || course.subtitle;
        course.abbreviation = abbreviation?.trim() || course.abbreviation;
        course.overview = overview?.trim() || course.overview;
        course.objectives = objectives || course.objectives;
        course.topics = topics || course.topics;
        course.structure = structure || course.structure;
        course.target_audience = target_audience || course.target_audience;

        await course.save();

        return res.status(200).json({
            message: `Course with ID ${_id} updated successfully!`,
            course
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};


// remove an course
const removeCourse = async (req, res) => {
    const { _id } = req.params;

    try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ error: 'Invalid course ID.' });
        }

        const course = await Course.findById(_id);

        if (!course) {
            return res.status(404).json({
                error: 'Course not found',
                message: `Course with ID ${_id} was not found.`
            });
        }

        await Course.findByIdAndDelete(_id);

        return res.status(200).json({ message: `"${course._id}" deleted successfully!` });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

export {
    addCourse,
    getCourses,
    editCourseInfo,
    removeCourse
};