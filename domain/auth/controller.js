import express from 'express';

import service from './service.js';
import service_token from './service-token.js';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      if(!validaParametro(nome)){
        return formataRetorno(res, 401, 'NOME é obrigatório.');
      }

      if(!validaParametro(email)){
        return formataRetorno(res, 401, 'EMAIL é obrigatório.');
      }

      if(!validaParametro(senha)){
        return formataRetorno(res, 401, 'SENHA é obrigatória.');
      }

      const usuario  = await service.registrarUsuario(nome, email, senha);

      return res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

router.post('/login', authMiddleware, async (req, res) => {
    try {
      const usuario  = await service.login(req.idToken);

      return res.status(200).json(usuario);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await service.buscarPerfil(req.idToken);

      const objectUser = {
        uid: user.uid,
        nome: user.displayName,
        email: user.email,
        emailVerificado: user.emailVerified,
        foto: user.photoURL,
        criadoEm: user.metadata.creationTime,
        ultimoLogin: user.metadata.lastSignInTime
      }

      return res.status(200).json(objectUser);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { displayName, email, photoURL, password } = req.body;

      const user = await service.atualizarPerfil(uid, displayName, email, photoURL, password);

      return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return formataRetorno(res, 500, error.message);
    }
});

router.post('/token-teste', async (req, res) => {
    try {
      const { uid } = req.body;

      const token  = await service_token.token(uid);

      return res.status(200).json(token);
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