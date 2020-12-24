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
  const { username, projectName, todo } = req.query;
  // these logs show up in the server vscode terminal
  db.deleteTodo(username, projectName, todo)
    .then(() => {
      console.log('database todo deletion sucess');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
    });
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
