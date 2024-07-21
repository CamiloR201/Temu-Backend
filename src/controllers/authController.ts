import { Request, Response } from 'express';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import { JsonWebKey } from 'crypto';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const userRepository = dataSource.getRepository(User);

export const registerUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, name } = req.body;

            const existingUser = await userRepository.findOneBy({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = userRepository.create({ email, password: hashedPassword, name });
            const result = await userRepository.save(user);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }
];

export const loginUser = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password is required'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;

            const user = await userRepository.findOneBy({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
];
