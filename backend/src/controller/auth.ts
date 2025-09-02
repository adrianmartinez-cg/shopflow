import type { Request, Response, NextFunction } from 'express';
import { AuthService } from '../service/auth.js';

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await AuthService.authenticate(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ token });
  };

  static authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Missing token' });

    const token = authHeader.split(' ')[1] ?? '';
    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  };
}
