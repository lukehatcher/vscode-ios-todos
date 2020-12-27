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
    todos: [{ type: String }],
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
    .findIndex((item) => item === todo);
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

const addTodo = async (user, project, newTodo) => {
  const doc = await UserInfo.findOne({ username: user });
  const projectIdx = doc.projects
    .findIndex((item) => item.projectName === project);
  doc.projects[projectIdx].todos.push(newTodo);
  await doc.save();
};

const validateLoginInfo = async (userName, passWord) => {
  const validation = await UserInfo.find({ username: userName, password: passWord });
  return validation.length > 0;
};

// example data for testing database functions
const exData = {
  username: 'jon doe',
  password: '1234',
  projects: [{
    projectName: 'app1',
    todos: ['fix errors', 'check linter', 'install packages', 'do things', 'run', 'up', 'a', 'b', 'c', 'd', 'e', 'efefe', 'sssss', 'sdfsfdsfs', 'dfdfdfdfdfn',
    ],
  },
  {
    projectName: 'app2',
    todos: ['fix more errors', 'configure files', 'delete comments', 'fix bug on line 55'],
  }],
};

const exAccountCreation = {
  username: 'jane doe',
  password: '1234',
  projects: [],
};

// example calls to test database functions
// initUserdata(exData);
// initUserdata(exAccountCreation);
// validateLoginInfo();
// getUserData('jon doe');
// deleteTodo('jon doe2', 'app1', 'install packages');
// deleteProject('jon doe', 'app2');
// addTodo('jon doe', 'app2', 'center div');
// addProject('jane doe', 'app3');

module.exports = {
  initUserdata,
  getUserData,
  deleteTodo,
  deleteProject,
  addProject,
  addTodo,
  validateLoginInfo,
};
