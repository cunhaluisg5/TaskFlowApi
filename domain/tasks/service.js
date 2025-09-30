import { db } from '../../config/database.js';

const cadastrarTask = async (uid, title, description) => {
  try{
      const newTask = {
        title,
        description: description,
        uid,
        createdAt: new Date().toISOString(),
        completed: false
      };

      const docRef = await db.collection("tasks").add(newTask);

      return docRef;
  }catch(err){
    throw err;
  }
}

export default {
    cadastrarTask
}