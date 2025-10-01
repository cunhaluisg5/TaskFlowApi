import express from 'express';

import service from './service.js';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { title, description } = req.body;

      if(!validateParameter(title) || !validateParameter(description)){
        return formatReturn(res, 401, 'Existem parâmetros obrigatórios que estão ausentes.');
      }

      const task = await service.registerTask(uid, title, description);

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { status } = req.query;

      const task = await service.searchTasks(uid, status);

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { id } = req.params;

      if(!validateParameter(id)){
        return formatReturn(res, 401, 'Existem parâmetros obrigatórios que estão ausentes.');
      }

      const task = await service.searchTaskById(uid, id);

      if(!task){
        return formatReturn(res, 401, 'Task não encontrada.');
      }

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const task = await service.updateTask(uid, id, title, description, completed);

      if(!task){
        return formatReturn(res, 401, 'Task não atualizada.');
      }

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { id } = req.params;

      const task = await service.deleteTask(uid, id);

      if(!task){
        return formatReturn(res, 401, 'Task não apagada.');
      }

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

const validateParameter = (parameter) => {
  return parameter != undefined && parameter != null && parameter.trim() != '';
}

const formatReturn = (res, cod, msg) => {
  res.status(cod).json({ cod, msg });
}

export default router;