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

export default {
    registrarUsuario
}