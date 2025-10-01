import { auth } from '../config/database.js';

export default async function authMiddleware(req, res, next){
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!validateParameter(authHeader)) {
    return formatReturn(res, 401, 'TOKEN é obrigatório.');
  }

  const idToken = authHeader.split(' ')[1];

  if(!validateParameter(idToken)){
    return formatReturn(res, 401, 'TOKEN inválido.');
  }

  const decodedToken = await auth.verifyIdToken(idToken);
  const uid = decodedToken.uid;

  req.idToken = idToken;
  req.uid = uid;
  
  next();
}

const validateParameter = (parameter) => {
  return parameter != undefined && parameter != null && parameter.trim() != '';
}

const formatReturn = (res, cod, msg) => {
  res.status(cod).json({ cod, msg });
}