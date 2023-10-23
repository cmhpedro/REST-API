const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());


const data = {"data": []};
let id = 0;

app.get("/api", (_, res) => {
    res.status(200).json(data);
});

app.get("/api/:id", (req, res) => {
    const { id } = req.params;
    const todo = data.data.find((todo) => todo.id === Number(id));

    if (todo) {
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({ message: `Todo with id ${id} not found` });
    }
});

app.post("/api", (req, res) => {
    const createdAt = new Date();
    const modifiedAt = new Date();
    const { name, isDone } = req.body;

    if (name === undefined || isDone === undefined) {
        res.status(400).json({ message: "Name and isDone are required" });
    }

    const newTodo = { id, createdAt, modifiedAt, name, isDone };
    data.data.push(newTodo);
    id++;

    res.status(200).json(newTodo);
});

app.put("/api/:id", (req, res) => {
    const { id } = req.params;
    const modifiedAt = new Date();
    const { name, isDone } = req.body;

    const todo = data.data.find((todo) => todo.id === Number(id));

    if (todo) {
        todo.modifiedAt = modifiedAt;
        todo.name = name;
        todo.isDone = isDone;
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({ message: `Todo with id ${id} not found` });
    }
});

app.delete("/api/:id", (req, res) => {
    const { id } = req.params;
    const todo = data.data.find((todo) => todo.id === Number(id));

    if (todo) {
        const index = data.data.indexOf(todo);
        data.data.splice(index, 1);
        res.status(200).json(todo);
    }
    else {
        res.status(404).json({ message: `Todo with id ${id} not found` });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
