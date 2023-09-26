const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Todo = require('./models/toDo');

app.use(express.json());

//routes

//read all todos
app.get('/todos', (req, res) => {
    Todo.find()
    .then(response => {
        res.json({
            response
        })
    }).catch((error) => {
        console.log(error);
    })
});

//add todo
app.post('/todos', (req, res) => {
    let todo = new Todo({
      todo: req.body.todo,
      completed: req.body.completed,
      no: req.body.no
    });
    todo.save()
      .then(response => {
        res.json({
          message: "Todo added successfully!"
        });
      }).catch((error) => {
        console.log(error);
      });
  });

//UPDATE todo by id
app.put('/todos/:id', (req, res) => {
    let todo_id = req.params.id;

    let updatedData = {
        todo: req.body.todo,
        completed: req.body.completed,
        no: req.body.no
    }
    Todo.findByIdAndUpdate(todo_id, {$set: updatedData})
    .then(response => {
        res.json({
            message: "TODO UPDATED SUCCESSFULLY!"
        }
        )
    }).catch((error) => {
        console.log(error);
    });
});

//DELETE todo by id
app.delete ('/todos/:id', (req, res) => {
    let todo_id = req.params.id;

    Todo.findByIdAndDelete(todo_id)
    .then(response => {
        res.json({
            message: "TODO DELETED SUCCESSFULLY!"
        }
        )
    }).catch((error) => {
        console.log(error);
    });
});

mongoose.
connect(process.env.DB_URL)
.then(()=>{
    console.log('Connected to MongoDB!');
    app.listen(3000, ()=>{
        console.log('Server started!');
    });
}).catch((error)=>{
    console.log(error);
});

