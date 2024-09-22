// Entry Point of the API Server
const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const Pool = require("pg").Pool;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // database: 'tournament',
  database: "testdb",
  password: "sudo",
  dialect: "postgres",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});

app.get("/testdata/:id", (req, res, next) => {
  var id = req.params.id;
  console.log("TEST DATA :");
  pool.query(`Select * from ${id}`).then((testData) => {
    console.log(testData);
    res.send(testData.rows);
  });
});

app.post("/insertscore", (req, res, next) => {
  // Parse data from the request body
  const { player, game, date, score, place } = req.body;

  // Insert data into the database
  pool
    .query(
      "INSERT INTO scores (player_id, game_id, date, score, place) VALUES ($1, $2, $3, $4, $5)",
      [player, game, date, score, place]
    )
    .then((testData) => {
      console.log(testData);
      res.send(testData.rows);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error inserting data into the database");
    });
});

app.post("/insertgames", (req, res, next) => {
    // Parse data from the request body
    const { name } = req.body;
  
    // Insert data into the database
    pool
      .query(
        "INSERT INTO games (name) VALUES ($1)",
        [name]
      )
      .then((testData) => {
        console.log(testData);
        res.send(testData.rows);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error inserting data into the database");
      });
  });

  app.post("/insertplayer", (req, res, next) => {
    // Parse data from the request body
    const { name } = req.body;
  
    // Insert data into the database
    pool
      .query(
        "INSERT INTO players (name) VALUES ($1)",
        [name]
      )
      .then((testData) => {
        console.log(testData);
        res.send(testData.rows);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error inserting data into the database");
      });
  });

app.post("/remove", (req, res, next) => {
  const { table, id } = req.body;
  pool.query(`delete from ${table} where id = ${id}`).then((testData) => {
    console.log(testData);
    res.send(testData.rows);
  });
});

const server = app.listen(3000, function () {
  console.log("app listening on port %s", server.address().port);
  let host = server.address().address;
  let port = server.address().port;
});
