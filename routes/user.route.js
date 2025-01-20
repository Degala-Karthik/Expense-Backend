import express from 'express';
import { register, login } from '../controllers/user.controller.js';

const UserRouter = express.Router();

// Define routes for user operations
UserRouter.post('/register', register);
UserRouter.post('/login', login);
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);

export default UserRouter;