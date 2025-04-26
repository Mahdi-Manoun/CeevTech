import express from 'express';
import {
    addWorkshop,
    editWorkshopInfo,
    getWorkshops,
    removeWorkshop
} from '../controllers/workshopController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadWorkshop } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadWorkshop.single('image_url'), addWorkshop);

router.get('/', getWorkshops);

router.patch('/:_id', isAdmin, uploadWorkshop.single('image_url'), editWorkshopInfo);

router.delete('/:_id', isAdmin, removeWorkshop);

export default router;