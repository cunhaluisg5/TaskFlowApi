import express from 'express';
import service from './service.js';

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

const validaParametro = (parametro) => {
  return parametro != undefined && parametro != null && parametro.trim() != '';
}

const formataRetorno = (res, codigo, mensagem) => {
  res.status(codigo).json({ cod: codigo, msg: mensagem });
}

export default router;