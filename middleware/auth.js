import { auth } from '../config/database.js';

export default async function authMiddleware(req, res, next){
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!validaParametro(authHeader)) {
    return formataRetorno(res, 401, 'TOKEN é obrigatório.');
  }

  const idToken = authHeader.split(' ')[1];

  if(!validaParametro(idToken)){
    return formataRetorno(res, 401, 'TOKEN inválido.');
  }

  const decodedToken = await auth.verifyIdToken(idToken);
  const uid = decodedToken.uid;

  req.idToken = idToken;
  req.uid = uid;
  
  next();
}

const validaParametro = (parametro) => {
  return parametro != undefined && parametro != null && parametro.trim() != '';
}

const formataRetorno = (res, codigo, mensagem) => {
  res.status(codigo).json({ cod: codigo, msg: mensagem });
}