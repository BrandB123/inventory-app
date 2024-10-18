const db = require("../db/queries");

async function addGenre(newGenre) {
    const res = await db.addGenre(newGenre)
    return res
}

module.exports = addGenre