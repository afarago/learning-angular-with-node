const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const http = require('http');

//------
var messages = [
  { text: 'some text', owner: 'Tim' },
  { text: 'other message', owner: 'Jane' }
];

var users = [{ firstName: 'a', email: 'a', password: 'a', id: 0 }];

//------
app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.json({ type: 'application/json' }));
//app.use(bodyParser.urlencoded({ extended: true })); //accept strings, arrays and any other type as values
app.disable('x-powered-by');

app.use(function(req, res, next) {
  //console.log(req); //!!
  //console.log(req.body); //!!

  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', ['GET, POST', 'PUT']);
  next();
});

//------
var api = express.Router();

api.get('/messages', (req, res) => {
  res.json(messages);
});

api.get('/messages/:user', (req, res) => {
  var user = req.params.user;
  var result = messages.filter(message => message.owner == user);
  res.json(result);
});

api.post('/messages', checkAuthenticated, (req, res) => {
  //-- Pass the auth header with the new message post request, and retrieve the username in the backend.
  var user = users[req.user];
  if (!user)
    return res
      .status(401)
      .send({ message: 'Not authorized for posting a new message' });

  req.body.owner = user.firstName;
  messages.push(req.body);

  res.json(req.body);
});

api.get('/users/me', checkAuthenticated, (req, res) => {
  var user = users[req.user];
  // delete user.password;
  // delete user.id;

  res.json(user);
});

api.post('/users/me', checkAuthenticated, (req, res) => {
  var user = users[req.user];

  //console.log(req.body);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  res.json(user);
});

app.use('/api', api);

//------
var auth = express.Router();

auth.post('/login', (req, res) => {
  //console.log('login');
  //console.log(req.body);
  //return;

  var user = users.find(user => {
    return user.email == req.body['email'];
  });

  // console.log("body");
  // console.log(req.body);
  // console.log("user");
  // console.log(user);

  if (!user) sendAuthError(res);
  else if (user.password == req.body.password) sendToken(user, res);
  else sendAuthError(res);
});

auth.post('/register', (req, res) => {
  //console.log(req.body);

  var user = users.find(user => {
    return user.email == req.body['email'];
  });
  if (user) {
    return res.status(400).send({ message: 'email already registered' });
  }

  var index = users.push(req.body) - 1;

  var user = users[index];
  user.id = index;

  sendToken(user, res);
});

function sendToken(user, res) {
  var token = jwt.sign(user.id, '123');
  var response = {
    firstName: user.firstName,
    token: token
  };
  res.json(response);
}

function sendAuthError(res) {
  return res.status(404).send({ message: 'email or password incorrect' });
}

function checkAuthenticated(req, res, next) {
  if (!req.header('Authorization'))
    return res
      .status(401)
      .send({ message: 'Unathorized request. Missing authentication header.' });

  var token = req.header('Authorization').split(' ')[1];
  var payload = jwt.decode(token, '123');

  if (!payload)
    return res.status(401).send({
      message: 'Unathorized request. Authentication header is invalid.'
    });

  req.user = payload;

  next();
}

app.use('/auth', auth);

//---
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// Send all other requests to the Angular app
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
  //res.status(404).send({ message: 'unable to find' });
});
//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

//------
//app.listen(63145);
server.listen(port, () => console.log(`Running on localhost:${port}`));
//console.log('server started');
