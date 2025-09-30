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

const buscarTasks = async (uid, status) => {
  try{
      status = status === 'true'; 
      let tasksRef = db.collection('tasks').where('completed', '==', status);

      if (uid) {
        tasksRef = tasksRef.where('uid', '==', uid);
      }

      const snapshot = await tasksRef.get();

      const tasks = [];
      snapshot.forEach(doc => {
        tasks.push({ id: doc.id, ...doc.data() });
      });

      return tasks;
  }catch(err){
    throw err;
  }
}

const buscarTaskPorId = async (uid, id) => {
  try {
    const doc = await db.collection('tasks').doc(id).get();

    if (!doc.exists) {
      return null;
    }

    const task = { id: doc.id, ...doc.data() };

    if (task.uid !== uid) {
      return null;
    }

    return task;
  } catch (err) {
    throw err;
  }
};

export default {
    cadastrarTask,
    buscarTasks,
    buscarTaskPorId
}