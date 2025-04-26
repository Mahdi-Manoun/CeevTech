import express from 'express';
import {
    addItem,
    editItemInfo,
    getItems,
    removeItem
} from '../controllers/itemController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadItem } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadItem.single('image_url'), addItem);

router.get('/', getItems);

router.patch('/:_id', isAdmin, uploadItem.single('image_url'), editItemInfo);

router.delete('/:_id', isAdmin, removeItem)

export default router;