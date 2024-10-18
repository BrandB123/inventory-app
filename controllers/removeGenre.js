const db = require("../db/queries");

async function removeGenre(genre) {
    const res = await db.removeGenre(genre)
    return res;
}

module.exports = removeGenre