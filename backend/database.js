const { Client } = require('pg');
const { post } = require('./app');
const connectionString = "postgres://cijrdlpc:ccum0E0SXHLZGxecxM0H_YCmGvZ_eGMJ@john.db.elephantsql.com:5432/cijrdlpc";

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
    `;


    const query2 = `
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
    `;

    const query1 = `
        CREATE TABLE category (
            categoryId SERIAL PRIMARY KEY,
            name varchar(150) NOT NULL
        );
    `;


    
    const query = `${dropTables} ${query1} ${query2}`;


    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
}



function addPost(title, date, author, content, subContent, images, categoryId, callback) {
    //console.log("Images: " + images);
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++}, $${i++})`
    const values = [title, date, author, content, subContent, images, categoryId]
    const query = `INSERT INTO posts (title, date, author, content, subContent, images, categoryId) VALUES ${template}`;
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
    const query = `SELECT P.postId, P.title, P.date, P.author, P.content, P.subContent, C.name AS categoryName FROM posts P INNER JOIN category C On P.categoryId = $1 and P.categoryId = C.categoryId;`;//joining posts and category table

    const client = connect();
    client.query(query, [categoryId], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}


module.exports = {
    resetTables,
    addPost,
    getPosts,
    getPost,
    getCategories,
    getPostsInCategory,
}