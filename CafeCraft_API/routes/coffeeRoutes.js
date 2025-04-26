import express from 'express';
import {
    addCoffee,
    editCoffeeInfo,
    getCoffees,
    removeCoffee
} from '../controllers/coffeeController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadCoffee } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadCoffee.single('image_url'), addCoffee);

router.get('/', getCoffees);

router.patch('/:_id', isAdmin, uploadCoffee.single('image_url'), editCoffeeInfo);

router.delete('/:_id', isAdmin, removeCoffee)

export default router;