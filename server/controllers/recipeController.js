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
        res.render('index', { title: 'Kamat Recipe App - Home', categories});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" });
    }
}

/*
 * Get /categories
 * Homepage
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




