const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Adarsh:singh9540@cluster0.yju1yru.mongodb.net/todoApp')

const todoSchema = mongoose.Schema({
   
    title:String,
    description:String,

    completed:Boolean
})

const todo = mongoose.model("todos",todoSchema);

module.exports = {
    todo
}