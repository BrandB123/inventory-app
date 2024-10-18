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

async function addGenre(newGenre){
    try {
        await pool.query(
            `INSERT INTO genres (name)
            VALUES ($1)`, [newGenre]
        );
        console.log("Genre Added to Database")
    } catch (error){
        console.error('Error Adding Genre: ', error);
    }
}

async function removeGenre(genre){
    try {

        const noneResult = await pool.query(`
            SELECT id FROM genres
            WHERE name = 'None'
            `) 
        const none = noneResult.rows[0].id;
        
        const books = await getDBBooks(genre)

        books.forEach((book) => {
            pool.query(`
                UPDATE books 
                SET genre_id = $1
                WHERE name = $2
                `, [none, book.name])
        })

        await pool.query(
            `DELETE FROM genres
            WHERE name = ($1)`, [genre]
        );
        console.log("Genre Removed from Database")

    } catch (error){
        console.error('Error Removing Genre: ', error);
    }
}

async function updateGenre(oldGenre, newGenre){
    try {
        await pool.query(
            `UPDATE genres
            SET name = $1
            WHERE name = $2`, 
            [newGenre, oldGenre]
        );
    } catch (error) {
        console.error('Error Updating Genre: ', error);
    }
}

module.exports = { getDBGenres, getDBBooks, addGenre, removeGenre, updateGenre }
