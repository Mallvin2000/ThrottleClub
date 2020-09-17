const { Client } = require('pg');
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
    `;


    const query1 = `
        CREATE TABLE posts (
            postId SERIAL PRIMARY KEY,
            title varchar(200) NOT NULL,
            date varchar(10) NOT NULL,
            author varchar(100) NOT NULL,
            content TEXT NOT NULL,
            images TEXT []
        );
    `;


    
    const query = `${dropTables} ${query1}`;


    client.query(query, (err, res) => {
        console.log(err, res)
        client.end()
    })
}



function addPost(title, date, author, content, images, callback) {
    //console.log("Images: " + images);
    let i = 1;
    const template = `($${i++}, $${i++}, $${i++}, $${i++}, $${i++})`
    const values = [title, date, author, content, images]
    const query = `INSERT INTO posts (title, date, author, content, images) VALUES ${template}`;
    console.log(values, query);

    const client = connect();
    client.query(query, values, (err, result) => {
        callback(err, result);
        client.end();
    });
}


function getPosts(callback) {
    const query = `SELECT * FROM posts`;

    const client = connect();
    client.query(query, [], (err, { rows }) => {
        callback(err, rows);
        client.end();
    });
}



module.exports = {
    resetTables,
    addPost,
    getPosts,
}