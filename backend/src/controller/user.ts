import { Request, Response } from 'express';
import UserService from '../service/user';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
});

class UserController {
  static getUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  };
  static registerUser = async (req: Request, res: Response) => {
    const parseResult = signupSchema.safeParse(req.body.user);

    if (!parseResult.success) {
      //const errors = z.treeifyError(parseResult.error)
      const errors = parseResult.error.flatten().fieldErrors;
      return res.status(422).json({ errors });
    }

    const { name, email, password } = parseResult.data;

    try {
      const user = await UserService.registerUser(name, email, password);
      res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } });
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(422).json({ errors: { email: ['Email already in use'] } });
      }
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default UserController;
