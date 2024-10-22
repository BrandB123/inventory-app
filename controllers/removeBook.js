const db = require("../db/queries");

async function removeBook(book) {
    const res = await db.removeBook(book)
    return res;
}

module.exports = removeBook