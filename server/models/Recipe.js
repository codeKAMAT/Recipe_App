const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: 'This field is required'
    },
})

module.exports = mongoose.model('Recipe', recipeSchema);