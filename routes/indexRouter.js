const { Router } = require("express");
const getBooks = require("../controllers/getBooks");
const addBook = require("../controllers/addBook");
const removeBook = require("../controllers/removeBook");
const updateBook = require("../controllers/updateBook");

const indexRouter = Router();

indexRouter.get("/", function(req, res){
    getBooks(req, res, "All");
});

indexRouter.post("/", async function(req, res){
    if (req.body.bookName && req.body.bookGenre && req.body.bookPrice && req.body.bookQuantity){
        try {
            const result = await addBook(req.body.bookName, req.body.bookGenre, req.body.bookPrice, req.body.bookQuantity);   
        } catch (error){
            console.error('Error Adding Book: ', error);
            res.redirect("/");
        }
    }

    if (req.body.deleteBookInput){
        try {
            const result = await removeBook(req.body.deleteBookInput)
        } catch(error){
            console.error('Error Deleting Book: ', error);
            res.redirect("/");
        }
    }

    if (req.body.bookUpdate){
        try{
            // console.log(`Field to update: ${req.body.bookFieldSelection}. Update to: ${req.body.bookUpdate}. Book to update: ${req.body.oldBookName}.`)
            const result = await updateBook(req.body.bookFieldSelection, req.body.bookUpdate, req.body.oldBookName)
        } catch(error){
            console.error('Error Updating Book: ', error);
            res.redirect("/");
        }
    }    
    
    if (req.body.genre === undefined){
        getBooks(req, res, "All");
    } else {
        getBooks(req, res, req.body.genre);
    }
});

module.exports = indexRouter; 