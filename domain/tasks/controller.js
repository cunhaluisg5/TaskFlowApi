import express from 'express';

import service from './service.js';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { title, description } = req.body;

      if(!validaParametro(title) || !validaParametro(description)){
        return formataRetorno(res, 401, 'Existem parâmetros obrigatórios que estão ausentes.');
      }

      const task = await service.cadastrarTask(uid, title, description);

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { status } = req.query;

      if(!validaParametro(status)){
        return formataRetorno(res, 401, 'Existem parâmetros obrigatórios que estão ausentes.');
      }

      const task = await service.buscarTasks(uid, status);

      return res.status(200).json(task);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

const validaParametro = (parametro) => {
  return parametro != undefined && parametro != null && parametro.trim() != '';
}

const formataRetorno = (res, codigo, mensagem) => {
  res.status(codigo).json({ cod: codigo, msg: mensagem });
}

export default router;