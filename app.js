const express = require('express');
const todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine','ejs');
//using static files
app.use(express.static('./public'));
todoController(app);

app.listen(3000);
console.log('listening to port 3000');
