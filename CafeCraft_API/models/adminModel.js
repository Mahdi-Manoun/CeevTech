import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// create a admin schema
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static login method
adminSchema.statics.login = async function (username, password) {
    const admin = await this.findOne({ username });

    if (!admin) throw new Error('Incorrect username or password');

    if (!username || !password) throw Error('All fields must be filled');

    const match = await bcrypt.compare(password, admin.password);

    if (!match) throw new Error('Incorrect username or password');

    return admin;
}

// create a admin model for schema
const Admin = new mongoose.model('Admin', adminSchema);

export default Admin;