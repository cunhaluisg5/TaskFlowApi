import express from 'express';

import service from './service.js';
import service_token from './service-token.js';
import authMiddleware from '../../middleware/auth.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if(!validateParameter(name) || !validateParameter(email) || !validateParameter(password)){
        return formatReturn(res, 401, 'Existem parâmetros obrigatórios que estão ausentes.');
      }

      const user  = await service.registerUser(name, email, password);

      return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.post('/login', authMiddleware, async (req, res) => {
    try {
      const user  = await service.login(req.idToken);

      return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await service.searchPerfil(req.idToken);

      const objectUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        verifiedEmail: user.emailVerified,
        photo: user.photoURL,
        createdAt: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime
      }

      return res.status(200).json(objectUser);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.put('/profile', authMiddleware, async (req, res) => {
    try {
      const { uid } = req;
      const { name, email, photo, password } = req.body;

      const user = await service.updatePerfil(uid, name, email, photo, password);

      if(!user){
        return formatReturn(res, 401, 'Perfil não foi atualizado.');
      }

      return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

router.post('/token-test', async (req, res) => {
    try {
      const { uid } = req.body;

      const token  = await service_token.token(uid);

      return res.status(200).json(token);
    } catch (error) {
        console.log(error);
        return formatReturn(res, 500, error.message);
    }
});

const validateParameter = (parametro) => {
  return parametro != undefined && parametro != null && parametro.trim() != '';
}

const formatReturn = (res, cod, msg) => {
  res.status(cod).json({ cod, msg });
}

export default router;