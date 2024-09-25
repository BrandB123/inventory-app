const { Router } = require("express");
const getBooks = require("../controllers/getBooks");

const indexRouter = Router();

indexRouter.get("/", function(req, res){
    getBooks(req, res, "All");
});

indexRouter.post("/", function(req, res){
    if (req.body.genre === undefined){
        getBooks(req, res, "All");
    } else {
        getBooks(req, res, req.body.genre);
    }
});

module.exports = indexRouter;