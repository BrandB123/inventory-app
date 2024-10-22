const db = require("../db/queries");

async function addBook(title, genre, price, quantity) {
    const res = await db.addBook(title, genre, price, quantity)
    return res
}

module.exports = addBook