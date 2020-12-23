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
    todos: ['fix errors', 'check linter', 'install packages'],
  },
  {
    projectName: 'app2',
    todos: ['fix more errors', 'configure files', 'delete comments', 'fix bug on line 55'],
  }],
};

const initUserdata = async (data) => {
  // would want to init once user signs up
  const doc = new UserInfo(data);
  doc.save()
    .catch((err) => {
      console.error('error saving doc', err);
    });
};

initUserdata(exData);

const addProject = async (data) => {
  // based off username... find that users doc
  // add project
};

const addProjectTodo = async (data) => {
  // based of username and project name...
  // push that todo onto the end of that projects todo array
};

const getData = async (user) => {
  try {
    const result = await UserInfo.findOne({ username: user });
    console.log(result.projects);
  } catch (err) {
    console.error(err);
  }
};
// getData('lukehatcher');
