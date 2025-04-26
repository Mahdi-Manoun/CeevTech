import express from 'express';
import {
    addTeammate,
    editTeammateInfo,
    getTeammates,
    removeTeammate
} from '../controllers/teammateController.js';

// middlewares
import isAdmin from '../middlewares/isAdmin.js';
import { uploadTeammate } from '../middlewares/upload.js';

const router = express.Router();

router.post('/', isAdmin, uploadTeammate.single('image_url'), addTeammate);

router.get('/', getTeammates);

router.patch('/:_id', isAdmin, uploadTeammate.single('image_url'), editTeammateInfo);

router.delete('/:_id', isAdmin, removeTeammate);

export default router;