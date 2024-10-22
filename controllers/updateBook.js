const db = require("../db/queries");

async function updateBook(column, newData, bookName){
    const res = await db.updatebook(column, newData, bookName);
    return res;
}

module.exports = updateBook