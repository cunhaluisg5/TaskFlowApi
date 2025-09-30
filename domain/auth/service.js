import { auth } from '../../config/database.js';

const registrarUsuario = async (nome, email, senha) => {
  try{
    const usuario = await auth.createUser({
      email: email,
      password: senha,
      displayName: nome
    });

    return usuario;
  }catch(err){
    throw err;
  }
}

const login = async (idToken) => {
  try{
    const login = await auth.verifyIdToken(idToken);

    return login;
  }catch(err){
    throw err;
  }
}

const buscarPerfil = async (idToken) => {
  try{
      const decodedToken = await auth.verifyIdToken(idToken);
      const uid = decodedToken.uid;
      const user  = await auth.getUser(uid);
      return user;
  }catch(err){
    throw err;
  }
}

const atualizarPerfil = async (uid, displayName, email, photoURL, password) => {
  try{
      const user = await auth.updateUser(uid, {
        displayName,
        email,
        photoURL,
        password
      });
      return user;
  }catch(err){
    throw err;
  }
}

export default {
    registrarUsuario,
    login,
    buscarPerfil,
    atualizarPerfil
}