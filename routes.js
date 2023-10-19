import { Router } from 'express';
import  { personas } from './controller.js';

export const router = Router();

router.get('/personas', personas.getAll);