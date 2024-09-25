const db = require("../db/queries");

async function getGenres(){
    const dbGenres = await db.getDBGenres();
    let genres = [];
    dbGenres.forEach(genre => {
        genres.push(genre.name);
    })
    return genres
}

module.exports = getGenres;