import express from 'express';

import authController from '../domain/auth/controller.js';
import tasksController from '../domain/tasks/controller.js';

const router = new express.Router(); 

router.use('/auth', authController);
router.use('/tasks', tasksController);

export default router;