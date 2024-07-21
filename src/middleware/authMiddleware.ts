import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

interface JwtPayload {
    userId: number;
}

interface CustomRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // `Bearer token`

    if (token == null) return res.status(401).json({ message: 'Token requerido' });

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token inválido' });

        // Añadir user al objeto de solicitud
        req.user = decoded as JwtPayload;
        next();
    });
};
