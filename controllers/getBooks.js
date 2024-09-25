const getGenres = require("../controllers/getGenres");
const db = require("../db/queries");

async function getBooks(req, res, selectedGenre){
    const dbGenres = await getGenres();
    const books = await db.getDBBooks(selectedGenre)
    res.render("index", { genres: dbGenres, books: books});
}

module.exports = getBooks;