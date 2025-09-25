import express from 'express';

import authController from '../domain/auth/controller.js';

const router = new express.Router(); 

router.use('/auth', authController);

export default router;