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
  projects: [{
    projectName: String,
    todos: [{ type: String }],
  }],
});

const UserInfo = mongoose.model('userInfo', userInfoSchema);

const exData = {
  username: 'jon doe',
  projects: [{
    projectName: 'app1',
    todos: ['fix errors',
      'check linter',
      'install packages',
      'do things',
      'run',
      'up',
      'a',
      'b',
      'c',
      'd',
      'e',
      'efefe',
      'sssss',
      'sdfsfdsfs',
      'dfdfdfdfdfn',
      'f', 'ff', 'k', 'kk', 'gg', 'dfsg', 'sdfgds', 'wrva', 'asd', 'rewrw', 'werwrewr', 'asfdg', 'asdfas',
    ],
  },
  {
    projectName: 'app2',
    todos: ['fix more errors', 'configure files', 'delete comments', 'fix bug on line 55'],
  }],
};

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
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const addProject = async (data) => {
  // based off username... find that users doc
  // add project
};

const addProjectTodo = async (data) => {
  // based of username and project name...
  // push that todo onto the end of that projects todo array
};

const deleteTodo = async (user, project, todo) => {
  const doc = await UserInfo.findOne({ username: user });
  console.log(doc);
  const projectIdx = doc.projects.findIndex((item) => item.projectName === project);
  console.log(projectIdx);
  console.log(doc.projects[projectIdx].todos);
  const todoIdx = doc.projects[projectIdx].todos.findIndex((item) => item === todo);
  doc.projects[projectIdx].todos.splice(todoIdx, 1);
  await doc.save();
};

initUserdata(exData);
// getUserData('jon doe');
// deleteTodo('jon doe2', 'app1', 'install packages');

module.exports = {
  initUserdata,
  getUserData,
  deleteTodo,
};
