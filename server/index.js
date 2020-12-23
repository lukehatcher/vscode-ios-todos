const express = require('express');
const morgan = require('morgan');
// import db handlers

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

// app.get('/api/projects/get/:username', (req, res) => {
//   const { username } = req.params;
//   // call db query function here
//   // res.send query results back
//   // else catch
// });

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
