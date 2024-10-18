const db = require("../db/queries");

async function updateGenre(oldGenre, newGenre){
    const res = await db.updateGenre(oldGenre, newGenre)
    return res;
}

module.exports = updateGenre