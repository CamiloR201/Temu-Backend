import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { dataSource } from '../data-source';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';
const userRepository: Repository<User> = dataSource.getRepository(User);

class AuthService {
    async registerUser(email: string, password: string, name: string): Promise<{ user: Partial<User>, token: string }> {
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userRepository.create({ email, password: hashedPassword, name });
        const result = await userRepository.save(user);

        const token = jwt.sign({ userId: result.id }, jwtSecret, { expiresIn: '1h' });

        return { user: { email: result.email, name: result.name }, token };
    }

    async loginUser(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return { user: { email: user.email, name: user.name }, token };
    }
}

export const authService = new AuthService();
