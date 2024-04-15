const express = require("express");
const { createTodo } = require("./type"); 
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const userRouter = require('./routes/user')
app.use(express.json());
app.use(cors());



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

app.put("/todo/:id", async function(req, res) {
    const todoId = req.params.id;
    const updatedFields = req.body;
  
    try {
      await todo.findByIdAndUpdate(todoId, updatedFields);
      res.json({
        msg: "Todo updated"
      });
    } catch (error) {
      res.status(404).json({
        message: "Todo not found"
      });
    }
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

app.use('/user',userRouter)

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${process.env.PORT || 3001}`);
});
