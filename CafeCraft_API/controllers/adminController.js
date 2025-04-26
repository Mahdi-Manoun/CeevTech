import Admin from '../models/adminModel.js';
import jwt from 'jsonwebtoken';

// create a token for logged in admin
const createToken = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Admin.login(username, password);

        const token = createToken(user._id);

        console.log({ username, token });

        return res.status(200).json({ username, token });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export default loginAdmin;