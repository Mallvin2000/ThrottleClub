var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./database");
const cors = require('cors');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/insert/post', (req, res) => {
//console.log(req.body);
  //console.log("entered");
  //for testing with test.http json data
  /*  const { data } = req.body
   var title = data.title;
   var date = data.date;
   var author = data.author;
   var content = data.content;
   var images = data.images; */
  var title = req.body.title;
  var date = req.body.date;
  var author = req.body.author;
  var content = req.body.content;
  var subContent = req.body.subContent;
  var images = req.body["images[]"];//stored as 'images[]': [ 'images', 'work', 'please' ] in request . body
  var categoryId = req.body.categoryId;
  /*
  //console.log(req.body);
[Object: null prototype] {
  title: '111',
  date: '2020-09-29',
  author: 'Mallvin Rajamohan',
  content: '111',
  'images[]': [ 'images', 'work', 'please' ]
}
  */

  //console.log("Images: " + images);



  database.addPost(title, date, author, content, subContent, images, categoryId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new post" });
    }
  });

});


app.get('/get/posts', (req, res) => {

  database.getPosts((err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});


app.get('/get/post/:postId', (req, res) => {
  var postId = req.params.postId;

  database.getPost(postId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});


app.get('/get/categories', (req, res) => {

  database.getCategories((err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});


app.get('/get/category/posts/:categoryId', (req, res) => {
  var categoryId = req.params.categoryId;

  database.getPostsInCategory(categoryId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: err.message,
    code: err.status || 500
  });
});

module.exports = app;
