import express from 'express';
import {
    addGrinder,
    editGrinderInfo,
    getGrinders,
    removeGrinder
} from '../controllers/coffeeGrinderController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadGrinder } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadGrinder.single('image_url'), addGrinder);

router.get('/', getGrinders);

router.patch('/:_id', isAdmin, uploadGrinder.single('image_url'), editGrinderInfo);

router.delete('/:_id', isAdmin, removeGrinder);

export default router;