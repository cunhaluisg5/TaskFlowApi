import express from 'express';
import service from './service.js';
import service_token from './service-token.js';

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

router.post('/login', async (req, res) => {
    try {
      const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
      if (!validaParametro(authHeader)) {
        return formataRetorno(res, 401, 'TOKEN é obrigatório.');
      }

      const idToken = authHeader.split(' ')[1];

      if(!validaParametro(idToken)){
        return formataRetorno(res, 401, 'TOKEN inválido.');
      }

      const usuario  = await service.login(idToken);

      return res.status(200).json(usuario);
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