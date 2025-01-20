import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../Schema/user.schema.js';
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            userId: uuidv4(),
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'secret', { expiresIn: '1h' });

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        console.error('Register error:', error)
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token, userId: existingUser.userId });
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};