import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// config
import createAdmin from './config/adminSetup.js';

// routes
import courseRoutes from './routes/courseRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import coffeeRoutes from './routes/coffeeRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import grinderRoutes from './routes/coffeeGrinderRoutes.js';
import accessoryRoutes from './routes/coffeeAccessoryRoutes.js';
import teammateRoutes from './routes/teammateRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

const ensureUploadFolders = async () => {
    const uploadsPath = path.join(__dirname, 'public', 'uploads');
    const requiredFolders = ['coffee', 'course', 'accessory', 'grinder', 'item', 'teammate', 'workshop'];

    try {
        // create folders for images
        for (const folder of requiredFolders) {
            const folderPath = path.join(uploadsPath, folder);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
                console.log(`The folder ${folder} was created successfully.`);
            }
        }
    } catch (err) {
        console.error('An error occurred while creating folders:', err);
        process.exit(1);
    }
}

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// routes
app.use('/api/auth', adminRoutes)
app.use('/api/courses', courseRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/coffees', coffeeRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/grinders', grinderRoutes);
app.use('/api/accessories', accessoryRoutes);
app.use('/api/teammates', teammateRoutes);

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// db connection
mongoose.connect(process.env.CONNECTION_STR)
    .then(async () => {
        console.log('Connected to db');

        try {
            await createAdmin();
            console.log('Admin account created successfully!');
            ensureUploadFolders();
        } catch (adminError) {
            console.error('Error creating admin account:', adminError);
        }

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}!`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to db:', err);
        process.exit(1);
    });