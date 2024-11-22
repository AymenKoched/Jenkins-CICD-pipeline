const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const connectDb = require('./db/database');
const User = require('./entities/user');
const app = express();

connectDb();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile-picture', function (req, res) {
  const img = fs.readFileSync(
    path.join(__dirname, '../assets/images/profile-1.jpg'),
  );
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

app.post('/update-profile', async function (req, res) {
  let userObj = req.body;

  userObj['userid'] = 1;

      const myQuery = { userid: 1 };
      const newValues = { $set: userObj };
      const user = await User.findOneAndUpdate(myQuery, newValues, {
        upsert: true,
        new: true,
      });

      res.send(user);




});

app.get('/get-profile', async function (req, res) {
  const myQuery = { userid: 1 };

  const response = await User.findOne(myQuery);

  res.send(response ? response : {});
});

const port = 3000;
app.listen(port, function () {
  console.log(`app listening on http://localhost:${port}`);
});
