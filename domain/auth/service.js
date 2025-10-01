import { auth } from '../../config/database.js';

const registerUser = async (name, email, password) => {
  try{
    const user = await auth.createUser({
      email,
      password,
      displayName: name
    });

    return user;
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

const searchPerfil = async (idToken) => {
  try{
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const user  = await auth.getUser(uid);
    return user;
  }catch(err){
    throw err;
  }
}

const updatePerfil = async (uid, name, email, photo, password) => {
  try{
    const updatableFields = {};

    if (name !== '') updatableFields.displayName = name;
    if (email !== '') updatableFields.email = email;
    if (photo !== '') updatableFields.photoURL = photo;
    if (password !== '') updatableFields.password = password;

    if(Object.values(updatableFields).length == 0){
      return null;
    }
    
    const user = await auth.updateUser(uid, updatableFields);
    return user;
  }catch(err){
    throw err;
  }
}

export default {
    registerUser,
    login,
    searchPerfil,
    updatePerfil
}