const { Client } = require('pg');
const { post } = require('./app');
const connectionString = "postgres://cijrdlpc:ccum0E0SXHLZGxecxM0H_YCmGvZ_eGMJ@john.db.elephantsql.com:5432/cijrdlpc";
var jwt = require("jsonwebtoken");

function connect() {
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect();
    return client;
}


function resetTables() {
    const client = connect();//create connection to database
    const dropTables = `
    DROP TABLE IF EXISTS posts;
    DROP TABLE IF EXISTS category;
    DROP TABLE IF EXISTS admins;
    `;


    /* const query2 = `
        CREATE TABLE posts (
            postId SERIAL PRIMARY KEY,
            title varchar(200) NOT NULL,
            date varchar(10) NOT NULL,
            author varchar(100) NOT NULL,
            content TEXT NOT NULL,
            subContent TEXT NOT NULL,
            images TEXT [],
            categoryId INT REFERENCES category (categoryId)
        );
    `; */



    const query2 = `
        CREATE TABLE posts (
            postId SERIAL PRIMARY KEY,
            title varchar(200) NOT NULL,
            date varchar(10) NOT NULL,
            author varchar(100) NOT NULL,
            content TEXT NOT NULL,
            subContent TEXT NOT NULL,
            coverImage TEXT NOT NULL,
            categoryId INT REFERENCES category (categoryId)
        );
    `;

    const query1 = `
        CREATE TABLE category (
            categoryId SERIAL PRIMARY KEY,
            name varchar(150) NOT NULL
        );
    `;

    const query3 = `
    CREATE TABLE admins (
        userId SERIAL PRIMARY KEY,
        username varchar(50) UNIQUE NOT NULL,
        password varchar(50) NOT NULL
    );
`;


    
    const query = `${dropTables} ${query1} ${query2} ${query3}`;


    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
}


function addUser(username, password, callback) {
    let i = 1;
    const template = `($${i++}, $${i++})`
    const values = [username, password]
    const query = `INSERT INTO admins (username, password) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}



function adminLogin(username, password, callback) {
    //console.log("In here man");
    const query = `SELECT * FROM admins WHERE username = '${username}' AND password = '${password}';`
    //console.log(query);

    const client = connect();
    client.query(query, [], (err, {rows}) => {
        //console.log(rows.length);
        //console.log(rows);
        if (rows.length == 1) {//username and password combination exists
            var token = "";
            //console.log(rows[0].userid);
            token = jwt.sign({ "userid": rows[0].userid }, "123", { expiresIn: "1hr" })//payload is an encrypted message hidden in the token(in this case the username), a secret key to encrypt and decrypt this token, options
            console.log(token);
            callback(null, { "token": token });
        } else {
            callback({ "auth": false, "message": "username/password not found" }, null);
        }
        //callback(err, rows)
        client.end();
    });
}


function checkForDuplicateUsername(username, callback) {
        
    const query = `SELECT * FROM admins WHERE username = $1`;
    const client = connect();
    client.query(query, [username], (err, { rows }) => {
        //console.log(rows.length);
        /*if (rows.length > 0) {
           // count++;
            //console.log("Duplicates: "+count);
        }*/
        callback(err, rows.length);
        client.end();
    });
}



function addPost(title, date, author, content, subContent, images, categoryId, callback) {
    //console.log("Images: " + images);
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++})`
    const values = [title, date, author, content, subContent, images, categoryId]
    const query = `INSERT INTO posts (title, date, author, content, subContent, coverImage, categoryId) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function getPosts(callback) {
    const query = `SELECT * FROM posts ORDER BY date desc`;// get all the posts orderd by latest first

    const client = connect();
    client.query(query, [], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


function getPosts2(postId, date, categoryId, limit=10, offset=0, callback) {
    let whereClause;
    let i = 1;
    const values = [];
    if (!postId && !date & !categoryId) {
        whereClause = '';
    } else {
        whereClause = 'WHERE '

        if (postId) { //filtering required
            postId += "";
            values.push(postId);
            whereClause += `postId = $${i++} `
        } 
         if (date) {
            date += "";
            values.push(date);
            whereClause += postId ? `AND date = $${i++} ` : `date = $${i++} `;//? is if  condition
        }
        if (categoryId) {
            categoryId += "";
            values.push(categoryId);
            whereClause += postId || date? `AND categoryId = $${i++} ` : `categoryId = $${i++} `;
        }
    }
    
    let limitOffsetClause = `LIMIT $${i++} OFFSET $${i++}`;
    values.push(parseInt(limit));//limit is page size/ how many rows you want to show
    values.push(parseInt(offset * limit));//offset is how many rows you want to ignore.   offset = currnt page size multiple delta which keeps track of which page we are on, see mr jeremiha explanation
    const query = `SELECT * FROM posts ${whereClause}ORDER BY date desc ${limitOffsetClause};`
    console.log(query);
    console.log(values);

    //const query = `SELECT * FROM posts ORDER BY date desc`;// get all the posts orderd by latest first

    const client = connect();
    client.query(query, values, (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


function getPost(postId, callback) {
    const query = `SELECT * FROM posts WHERE postId = $1`;

    const client = connect();
    client.query(query, [postId], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


function getCategories(callback) {
    const query = `SELECT * FROM category;`;

    const client = connect();
    client.query(query, [], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


function getPostsInCategory(categoryId, callback) {
    //const query = `SELECT * FROM posts WHERE categoryId = $1;`;
    const query = `SELECT P.postId, P.title, P.date, P.author, P.content, P.subContent, P.coverImage, C.name AS categoryName FROM posts P INNER JOIN category C On P.categoryId = $1 and P.categoryId = C.categoryId ORDER BY date desc;`;//joining posts and category table

    const client = connect();
    client.query(query, [categoryId], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


function addCategory(name, callback) {
    let i = 1;
    const template = `($${i++})`
    const values = [name]
    const query = `INSERT INTO category (name) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function updatePost(postId, title, date, author, content, subContent, categoryId, callback) {
    const values = [title, date, author, content, subContent, categoryId, postId]
    const query = `UPDATE posts SET title = $1, date = $2, author = $3, content = $4, subContent = $5, categoryId = $6 WHERE postId = $7`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function deletePost(postId, callback) {
    const query = `DELETE FROM posts WHERE postId = $1;`
    //console.log(query);
    const client = connect();
    client.query(query, [postId], (err, { rows }) => {
        //console.log(rows);
        callback(err, rows);
        client.end();
    });
}


module.exports = {
    addUser,
    adminLogin,
    resetTables,
    addPost,
    getPosts,
    getPost,
    getCategories,
    getPostsInCategory,
    checkForDuplicateUsername,
    addCategory,
    getPosts2,
    updatePost,
    deletePost,
    
}