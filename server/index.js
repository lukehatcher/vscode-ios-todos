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
    });
});

app.delete('/api/projects/delete', (req, res) => {
  const { type, username, projectName, todo } = req.query;

  if (type === 'todo') { // just deleting a todo from a project
    db.deleteTodo(username, projectName, todo)
      .then(() => {
        console.log('database todo deletion sucess');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
      });
  } else if (type === 'project') { // deleting whole project
    db.deleteProject(username, projectName)
      .then(() => {
        console.log('database project deletion success');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

// app.post('/api/projects/post/:username', (req, res) => {
//   const { username } = req.params;
//   // call db query function here
//   // res.send query results back
//   // else catch
// });

// app.update('/api/projects/:username', (req, res) => {
//   const { username } = req.params;
//   // call db query function here
//   // res.send query results back
//   // else catch
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
