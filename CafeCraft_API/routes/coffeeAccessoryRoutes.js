import express from 'express';
import {
    addAccessory,
    editAccessoryInfo,
    getAccessories,
    removeAccessory
} from '../controllers/coffeeAccessoryController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadAccessory } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadAccessory.single('image_url'), addAccessory);

router.get('/', getAccessories);

router.patch('/:_id', isAdmin, uploadAccessory.single('image_url'), editAccessoryInfo);

router.delete('/:_id', isAdmin, removeAccessory);

export default router;