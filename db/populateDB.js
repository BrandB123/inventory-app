#! /usr/bin/env node

require('dotenv').config()
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (30) UNIQUE
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(100),
  genre_id INTEGER,
  price REAL,
  quantity INTEGER
);

INSERT INTO genres (name) 
VALUES ('History'), ('Adventure'), ('Sci Fi'), ('Fantasy');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();