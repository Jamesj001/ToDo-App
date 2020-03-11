var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var data = [{item:'get milk'},{item:'go to shop'},{item:'do some coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to databse
mongoose.connect('mongodb://test:test8@cluster0-shard-00-00-sabbu.mongodb.net:27017,cluster0-shard-00-01-sabbu.mongodb.net:27017,cluster0-shard-00-02-sabbu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true });

//creating a schema like a blueprint
var todoSchema = new mongoose.Schema({
  item:String
});

//defining the model wwhich we are going to use
var Todo = mongoose.model('Cluster0',todoSchema);

// var itemOne = Todo({item:'buy flowers'}).save(function(err) {
//   if(err) throw err;
//   console.log('item saved');
// });

module.exports = function(app) {
app.use(bodyParser.json());


    app.get('/todo',function (req,res) {

    //get data from mongodb and pass it to view
    Todo.find({},function(err,data) {
      if(err) throw err;
      res.render('todo',{todos:data});

    })

  });

   app.post('/todo',urlencodedParser,function (req,res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function (err,data) {
      if(err) throw err;
        res.json(data);

    });
    //data.push(req.body);
  //  res.json(data);
});

    //for deleting entries in todoapp
  app.delete('/todo/:item',function (req,res) {

    //delete the requested item from mongodb
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function (err,data) {
      if(err) throw err;
      res.json(data);
    });
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g,'-') !== req.params.item;
    });
}
