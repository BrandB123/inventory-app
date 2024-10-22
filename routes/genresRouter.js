const { Router } = require("express");
const getGenres = require("../controllers/getGenres");
const addGenre = require("../controllers/addGenre");
const removeGenre = require("../controllers/removeGenre");
const updateGenre = require("../controllers/updateGenre");

const genresRouter = Router();

genresRouter.get("/", async function (req, res){
    const genres = await getGenres();
    res.render("genresPage", {genres: genres });
});

genresRouter.post("/", async function(req, res){
    if (req.body.genreName){
        try {
            console.log(req.body.genreName)
            const result = await addGenre(req.body.genreName);   
        } catch (error){
            console.error('Error Adding Genre: ', error);
            res.redirect("/genres");
        }
    }

    if (req.body.deleteInput){
        if (req.body.deleteInput.toLowerCase() !== "none"){
            console.log(`Delete [${req.body.deleteInput}] from the database`)
            const result = await removeGenre(req.body.deleteInput)
        }
    }
    
    if (req.body.newGenreName){
        if (req.body.newGenreName.toLowerCase() !== "none"){
            console.log(`Updated from ${req.body.oldGenreName} to ${req.body.newGenreName} in the database`)
            const result = await updateGenre(req.body.oldGenreName, req.body.newGenreName)
        }
    }

    res.redirect("/genres");
}); 

module.exports = genresRouter; 