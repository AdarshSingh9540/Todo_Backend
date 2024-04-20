const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect('mongodb+srv://Adarsh:singh9540@cluster0.yju1yru.mongodb.net/todoApp')

const todoSchema = mongoose.Schema({
   
    title:String,
    description:String,
    completed:Boolean
})

const UserSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    Todos : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'todo'
    }]

});


const todo = mongoose.model("todos",todoSchema);
const User = mongoose.model('User',UserSchema);


module.exports = {
    todo,
    User
}