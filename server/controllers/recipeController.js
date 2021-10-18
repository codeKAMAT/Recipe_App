require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');



/*
 * Get /
 * Homepage
*/
exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);
        const indian = await Recipe.find({ 'category' : 'Indian' }).limit(limitNumber);


        const food = {latest, thai, american, chinese, indian };
        
        res.render('index', { title: 'Kamat Recipe App - Home', categories, food});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/*
 * Get /categories
 * Categories
*/
exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Kamat Recipe App - Categories', categories});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/*
 * Get /categories/:id
 * CategoriesById
*/
exports.exploreCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoriesById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Kamat Recipe App - Categories', categoriesById});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}



/*
 * Get /recipe/:id
 * Recipe
*/
exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Kamat Recipe App - Recipe', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/*
 * POST /search
 * Search
*/

exports.searchRecipe = async(req, res) => {
    // searchTerm
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive: true} });
        // res.json(recipe);
        res.render('search', {title: 'Kamat Recipe App - Search', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }

}





/*
 * Get /explore-latest
 * Explore Latest
*/
exports.exploreLatest = async(req, res) => {
    try {
       const limitNumber = 20;
       const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
       res.render('explore-latest', { title: 'Kamat Recipe App - Explore Latest', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}


/*
 * Get /explore-random
 * Explore Random as JSON
*/
exports.exploreRandom = async(req, res) => {
    try {
       let count = await Recipe.find().countDocuments();
       let random = Math.floor(Math.random() * count);
       let recipe = await Recipe.findOne().skip(random).exec();
       // res.json(recipe)
       res.render('explore-random', { title: 'Kamat Recipe App - Explore Random', recipe});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}




/*
 * Get /submit-recipe
 * Submit Recipe
*/

exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Kamat Recipe App - Submit Recipe', infoErrorsObj, infoSubmitObj  } );
  }

/*
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
    try {
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files where uploaded.')
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;
            uploadPath = require('path').resolve('./')+'/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err);
            })
        }

        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        })
        await newRecipe.save(); //save to database

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe');
    } catch (error) {
            // res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');

    }
    
}










