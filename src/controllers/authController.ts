import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from '../services/authService';

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
            const result = await authService.registerUser(email, password, name);
            res.status(201).json(result);
        } catch (error) {
            if ((error as Error).message === 'Email already in use') {
                return res.status(400).json({ message: (error as Error).message });
            }
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
            const result = await authService.loginUser(email, password);
            res.status(200).json(result);
        } catch (error) {
            if ((error as Error).message === 'Invalid credentials') {
                return res.status(400).json({ message: (error as Error).message });
            }
            res.status(500).json({ message: 'Error logging in', error });
        }
    }
];
