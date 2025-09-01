import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import dotenv from 'dotenv';

dotenv.config();
export class AuthService {
  static async authenticate(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) return null;

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' }
    );

    return token;
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET ?? '');
    } catch {
      return null;
    }
  }
}

export default AuthService;