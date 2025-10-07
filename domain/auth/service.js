import { auth } from '../../config/database.js';
import axios from 'axios';
import 'dotenv/config';

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

const authenticate = async (idToken) => {
  try{
    const login = await auth.verifyIdToken(idToken);
    return login;
  }catch(err){
    throw err;
  }
}

const login = async (email, password) => {
  try{
    const loginResponse = await loginWithEmailPassword(email, password);
    const { idToken } = loginResponse;
    const decoded = await auth.verifyIdToken(idToken);
    return {
      message: 'Login realizado com sucesso!',
      user: {
        uid: decoded.uid,
        email: decoded.email,
      },
      token: `Bearer ${idToken}`
    }
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

const loginWithEmailPassword = async ( email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`;

  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data;
}

export default {
    registerUser,
    login,
    searchPerfil,
    updatePerfil,
    authenticate
}