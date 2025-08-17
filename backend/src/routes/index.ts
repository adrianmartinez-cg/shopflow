import { Router } from 'express';
import UserController from '../controller/user';


const router = Router();

router.get('/users', UserController.getUsers);
router.post('/register', UserController.registerUser);

export default router;
