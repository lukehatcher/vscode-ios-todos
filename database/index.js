const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nativetest', { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.log(err);
  });

const db = mongoose.connection;

db.on('connected', () => {
  console.log('connected to MongoDB');
});

db.on('error', (err) => {
  console.log(err);
});

const userInfoSchema = new mongoose.Schema({ // for post only
  username: String,
  password: String,
  projects: [{
    projectName: String,
    todos: [{
      text: String,
      completed: Boolean, // edited
    }],
  }],
});

const UserInfo = mongoose.model('userInfo', userInfoSchema);

const initUserdata = async (data) => {
  // would want to init once user signs up
  const doc = new UserInfo(data);
  try {
    await doc.save();
  } catch (err) {
    console.error(err);
  }
};

const getUserData = async (user) => {
  try {
    const result = await UserInfo.findOne({ username: user });
    return result;
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (user, project, todo) => {
  const doc = await UserInfo.findOne({ username: user });
  const projectIdx = doc.projects
    .findIndex((item) => item.projectName === project);
  const todoIdx = doc.projects[projectIdx].todos
    .findIndex((item) => item.text === todo); // edited
  doc.projects[projectIdx].todos.splice(todoIdx, 1);
  await doc.save();
};

const deleteProject = async (user, project) => {
  const doc = await UserInfo.findOne({ username: user });
  const projectIdx = doc.projects
    .findIndex((item) => item.projectName === project);
  doc.projects.splice(projectIdx, 1);
  await doc.save();
};

const addProject = async (user, newProject) => {
  const doc = await UserInfo.findOne({ username: user });
  const emptyProj = {
    projectName: newProject,
    todos: [],
  };
  doc.projects.push(emptyProj);
  await doc.save();
};

const addTodo = async (user, project, newTodo) => { // todo is a string
  const todoObj = {
    text: newTodo,
    completed: false,
  };
  const doc = await UserInfo.findOne({ username: user });
  const projectIdx = doc.projects
    .findIndex((item) => item.projectName === project);
  doc.projects[projectIdx].todos.push(todoObj);
  await doc.save();
};

const toggleTodoCompletion = async (user, project, todo) => { // brand new
  const doc = await UserInfo.findOne({ username: user });
  const projectIdx = doc.projects
    .findIndex((item) => item.projectName === project);
  const todoIdx = doc.projects[projectIdx].todos
    .findIndex((item) => item.text === todo);
  const oldState = doc.projects[projectIdx].todos[todoIdx].completed;
  doc.projects[projectIdx].todos[todoIdx].completed = !oldState;
  await doc.save();
};

const validateLoginInfo = async (userName, passWord) => {
  const validation = await UserInfo.find({ username: userName, password: passWord });
  return validation.length > 0;
};

// ==== example data for testing database functions ====
// const exData = {
//   username: 'jon doe',
//   password: '1234',
//   projects: [{
//     projectName: 'app1',
//     todos: [
//       { text: 'build', completed: false },
//       { text: 'edit', completed: false },
//       { text: 'compile', completed: true },
//       { text: 'run linter', completed: false },
//       { text: 'do things', completed: false },
//       { text: 'do more things', completed: true },
//       { text: 'run app', completed: false },
//       { text: 'hotspot', completed: false },
//       { text: 'run car', completed: true },
//       { text: 'run build', completed: false },
//     ],
//   },
//   {
//     projectName: 'app2',
//     todos: [
//       { text: 'fix more errors', completed: false },
//       { text: 'fix more errors', completed: false },
//       { text: 'delete comments', completed: true },
//       { text: 'fix bug on line 55', completed: false },
//     ],
//   }],
// };

// const exAccountCreation = {
//   username: 'jane doe',
//   password: '1234',
//   projects: [],
// };

// ==== example calls to test database functions ====
// initUserdata(exData);
// initUserdata(exAccountCreation);
// validateLoginInfo();
// getUserData('jon doe');
// deleteTodo('jon doe2', 'app1', 'install packages');
// deleteProject('jon doe', 'app2');
// addTodo('jon doe', 'app2', 'center div');
// addProject('jane doe', 'app3');
// toggleTodoCompletion('jon doe', 'app1', 'build');

module.exports = {
  initUserdata,
  getUserData,
  deleteTodo,
  deleteProject,
  addProject,
  addTodo,
  validateLoginInfo,
};
