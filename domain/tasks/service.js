import { db } from '../../config/database.js';

const registerTask = async (uid, title, description) => {
  try{
      const newTask = {
        title,
        description: description,
        uid,
        createdAt: new Date().toISOString(),
        completed: false
      };

      const docRef = await db.collection('tasks').add(newTask);

      return docRef;
  }catch(err){
    throw err;
  }
}

const searchTasks = async (uid, status) => {
  try{
      status = status === 'true'; 
      let tasksRef = db.collection('tasks');

      if(status){
        tasksRef = db.collection('tasks').where('completed', '==', status);
      }

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

const searchTaskById = async (uid, id) => {
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

const updateTask = async (uid, id, title, description, completed) => {
  try{
      const taskRef = db.collection('tasks').doc(id);
      const doc = await taskRef.get();

      if (!doc.exists) {
        return null;
      }

      const task = { id: doc.id, ...doc.data() };

      if (task.uid !== uid) {
        return null;
      }

      const updatableFields = {};
      if (title !== undefined) updatableFields.title = title;
      if (description !== undefined) updatableFields.description = description;
      if (completed !== undefined) updatableFields.completed = completed;

      if(Object.values(updatableFields).length == 0){
        return null;
      }

      updatableFields.updatedAt = new Date().toISOString();

      await taskRef.update(updatableFields);

      const docUpdated = await taskRef.get();

      return docUpdated;
  }catch(err){
    throw err;
  }
}

const deleteTask = async (uid, id) => {
  try{
      const taskRef = db.collection('tasks').doc(id);
      const doc = await taskRef.get();

      if (!doc.exists) {
        return null;
      }

      const task = { id: doc.id, ...doc.data() };

      if (task.uid !== uid) {
        return null;
      }

      await taskRef.delete();

      return task;
  }catch(err){
    throw err;
  }
}

export default {
    registerTask,
    searchTasks,
    searchTaskById,
    updateTask,
    deleteTask
}