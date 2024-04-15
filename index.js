const express = require("express");
const { createTodo } = require("./type"); 
const { todo } = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());


const BASE_URL = "https://your-vercel-app.vercel.app"; 

app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(400).json({
            message: "You sent the wrong inputs"
        });
        return;
    }

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: createPayload.completed || false 
    });

    res.json({
        msg: "Todo created"
    });
});

app.get("/todos", async function(req, res) {
    const todos = await todo.find({});

    res.json({
        todos: todos 
    });
});

app.delete("/todo/:id", async function(req, res) {
    const todoId = req.params.id;

    try {
        await todo.findByIdAndDelete(todoId);
        res.json({
            msg: "Todo deleted"
        });
    } catch (error) {
        res.status(404).json({
            message: "Todo not found"
        });
    }
});



app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
