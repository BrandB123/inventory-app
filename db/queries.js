const pool = require("./pool");

async function getDBGenres(){
    const { rows } = await pool.query("SELECT name FROM genres")
    return rows;
}

async function getDBBooks(genre){
    if (genre === "All"){
        genre = "%";
    }
    const { rows } = await pool.query(`
        SELECT books.name, books.price, books.quantity 
        FROM books 
        INNER JOIN genres ON books.genre_id = genres.id
        WHERE genres.name LIKE $1`, [genre])
    return rows;
}

module.exports = { getDBGenres, getDBBooks }
