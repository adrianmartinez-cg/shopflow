import type { Request, Response } from 'express';
import UserService from '../service/user.js';
import { z } from 'zod';
import { INTERNAL_SERVER_ERROR } from '../constants/globals.js';

const signupSchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
});

class UserController {
  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getUsers();
      return res.json(users);
    } catch {
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  };
  static registerUser = async (req: Request, res: Response) => {
    const parseResult = signupSchema.safeParse(req.body.user);

    if (!parseResult.success) {
      const errors = z.treeifyError(parseResult.error)
      return res.status(422).json({ errors });
    }

    const { name, email, password } = parseResult.data;

    try {
      const user = await UserService.registerUser(name, email, password);
      return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(422).json({ error: error.message });
      } else {
        console.error(error);
        return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
    }
  };
}

export default UserController;
