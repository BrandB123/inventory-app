const { Router } = require("express");
const getDBGenres = require("../controllers/getGenres")

const genresRouter = Router();

genresRouter.get("/", async function (req, res){
    const genres = await getDBGenres();
    res.render("genresPage", {genres: genres });
});

genresRouter.post("/", function(req, res){
    res.send("This is what happens when a post request is sent");
});

module.exports = genresRouter;