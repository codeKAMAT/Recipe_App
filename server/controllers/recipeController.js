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


        const food = {latest, thai, american, chinese };
        
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


// async function insertDummyRecipeData() {
//     try {
//         await Recipe.insertMany([
//                   { 
//                     "name": "Recipe Name Goes Here",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "hello@codekamat.me",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "southern-friend-chicken.jpg"
//                   },
//                   { 
//                     "name": "Recipe Name Goes Here",
//                     "description": `Recipe Description Goes Here`,
//                     "email": "hello@codekamat.me",
//                     "ingredients": [
//                       "1 level teaspoon baking powder",
//                       "1 level teaspoon cayenne pepper",
//                       "1 level teaspoon hot smoked paprika",
//                     ],
//                     "category": "American", 
//                     "image": "southern-friend-chicken.jpg"
//                   },
//                 ]);
//     } catch(error){
//         console.log('err', + error);
//     }
// }

// insertDummyRecipeData();

