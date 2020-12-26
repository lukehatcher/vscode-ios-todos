const express = require('express');
const morgan = require('morgan');
const db = require('../database/index');

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/projects/get/:username', (req, res) => {
  const { username } = req.params;

  db.getUserData(username)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error('error in server', err);
      res.sendStatus(400);
    });
});

app.delete('/api/projects/delete', (req, res) => {
  const { type, username, projectName, todo } = req.query;
  console.log(req.body);
  if (type === 'todo') { // just deleting a todo from a project
    db.deleteTodo(username, projectName, todo)
      .then(() => {
        console.log('database todo deletion sucess');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  } else if (type === 'project') { // deleting whole project
    db.deleteProject(username, projectName)
      .then(() => {
        console.log('database project deletion success');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

app.post('/api/projects/post', (req, res) => {
  const { type, username, projectName, todo } = req.body;
  if (type === 'todo') {
    db.addTodo(username, projectName, todo)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('error posting todo to db', err);
        res.sendStatus(400);
      });
  } else if (type === 'project') {
    db.addProject(username, projectName)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('error posting todo to db', err);
        res.sendStatus(400);
      });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
