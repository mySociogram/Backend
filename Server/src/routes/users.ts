import express from'express';
import { getAllUsers, userSignUp } from '../controller/userController';

const router = express.Router();


router.post('/', userSignUp )
router.get('/allUsers',getAllUsers)

export default router;
