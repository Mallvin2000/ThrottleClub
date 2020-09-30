var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./database");
const cors = require('cors');
var verifyToken = require("./Auth/verifyToken");


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.post('/insert/user', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  database.checkForDuplicateUsername(username, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err });
    } else if (result > 0) {
      res.status(400).json({
        "error": "Duplicate Entry, Username exists",
        "code": "400"
      })
    } else {
      database.addUser(username, password, (err, result) => {
        if (err) {
          res.status(500).send({ "Error": err.detail });

        } else {
          res.json({ result: "Successfully Created New Admin User" });
        }
      });
    }
  });
});




app.post('/login', (req, res) => {
  //console.log("login received");
  var username = req.body.username;
  var password = req.body.password;
  //console.log(username, password);

  database.adminLogin(username, password, (error, result) => {
    if (error) {
      res.status(500).send({ "Error": error.detail });

    } else {
      //console.log(result);
      res.json(result);
    }
    //console.log(result);

  });
});


app.post('/insert/post', verifyToken, (req, res) => {
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
const {order} = req.query
  database.getPosts(order, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});


app.get('/get/posts2', (req, res) => {
  const { postId, date, categoryId, limit, offset } = req.query;//extract from the get URL
  /* var postId = req.body.postId;
  var date = req.body.date;
  var categoryId = req.body.categoryId;
  var limit = req.body.limit;
  var offset = req.body.offset; */

  database.getPosts2(postId, date, categoryId, limit, offset, (err, result) => {
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


app.get('/get/category/posts', (req, res) => {
  //var categoryId = req.params.categoryId;//extracting from req.params 
 const {categoryId, order} = req.query; //extracting from req.query aka the url
  database.getPostsInCategory(categoryId, order, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});



app.post('/insert/category', verifyToken, (req, res) => {
  var name = req.body.name

  database.addCategory(name, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new category" });
    }
  });

});


app.post('/insert/message', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message

  database.addMessage(name, email, message, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new message" });
    }
  });
});



app.put('/update/post', verifyToken, (req, res) => {
  var postId = req.body.id;
  var title = req.body.title;
  var date = req.body.date;
  var author = req.body.author;
  var content = req.body.content;
  var subContent = req.body.subContent;
  var categoryId = req.body.categoryId;

  database.updatePost(postId, title, date, author, content, subContent, categoryId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully updated post" });
    }
  });

});



app.delete('/delete/post/:id', verifyToken, (req, res) => {
  //var userid = req.body.userid;
  var postId = req.params.id;

  database.deletePost(postId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json({result: "Successfully deleted"});
    }
  });

});


app.get('/get/comments/:id', (req, res) => {
  var postId = req.params.id;

  database.getAllComments(postId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });
    } else {
      res.json(result);
    }
  })
});


app.post('/insert/comment', (req, res) => {
  var name = req.body.name;
  var comment = req.body.comment;
  var date = req.body.date;
  var postId = req.body.postId;

  database.addComment(name, comment, date, postId, (err, result) => {
    if (err) {
      res.status(500).send({ "Error": err.detail });

    } else {
      res.json({ result: "Successfully added new comment" });
    }
  });

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
