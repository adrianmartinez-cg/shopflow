import { User } from '../model/user';
import bcrypt from 'bcrypt';

class UserService {
    static getUsers = async (): Promise<User[]> => {
        return await User.findAll();
    };
    static registerUser = async (name: string, email: string, password: string) => {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(`User: ${name},${email},${hashedPassword}`)
        const newUser = await User.create({
            name,
            email,
            hashedPassword,
            role: 'user',
        });

        return newUser;
    };
}

export default UserService;