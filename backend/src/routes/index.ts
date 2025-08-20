import { Router } from 'express';
import UserController from '../controller/user';
import { AuthController } from '../controller/auth';

const router = Router();

router.get('/users', UserController.getUsers);
router.post('/register', UserController.registerUser);
router.post('/login', AuthController.login);

export default router;
