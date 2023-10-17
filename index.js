const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPth = path.join(__dirname, "goodreads.db");

const { open } = require("sqlite");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPth,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("server running started");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id;
    `;

  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});
