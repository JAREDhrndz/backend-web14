// src/routes/auth.routes.ts
import {Router} from 'express'
import {getAllUsers, getTimeToken, getUserByUsername, login, saveUser, updateToken, updateUser, deleteUser} from "../controllers/auth.controller"

const router = Router();

router.post('/login-user', login);
router.get('/getTime/:userId', getTimeToken);
router.patch('/update/:userId', updateToken);
router.get('/users', getAllUsers);
router.post('/users', saveUser);
router.get('/users/name/:userName', getUserByUsername);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

export default router;