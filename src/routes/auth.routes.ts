// src/routes/auth.routes.ts
import { Router, Request, Response } from 'express';
import {
  getAllUsers,
  getTimeToken,
  getUserByUsername,
  login,
  saveUser,
  updateToken,
  updateUser,
  deleteUser
} from "../controllers/auth.controller";

const router = Router();

router.post('/login-user', (req: Request, res: Response) => login(req, res));
router.get('/getTime/:userId', (req: Request, res: Response) => getTimeToken(req, res));
router.patch('/update/:userId', (req: Request, res: Response) => updateToken(req, res));
router.get('/users', (req: Request, res: Response) => getAllUsers(req, res));
router.post('/users', (req: Request, res: Response) => saveUser(req, res));
router.get('/users/name/:userName', (req: Request, res: Response) => getUserByUsername(req, res));
router.patch('/users/:userId', (req: Request, res: Response) => updateUser(req, res));
router.delete('/users/:userId', (req: Request, res: Response) => deleteUser(req, res));

export default router;