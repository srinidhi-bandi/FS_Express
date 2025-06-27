import express from 'express'

const app = express();
const port = 3500;

app.use(express.json())
let tasks = [
    {id:1,title:"Arrange clothes",description:"arrange formal wear" ,status:"Pending"},
    {id:2, title:"Cook", description: "Make Chapati Palya", status:"in-progress"},
    {id:3, title:"Travel", description: "Visit Taj Mahal", status: "Completed"}
];

app.get('/tasks', (req,res) => {
    res.send(tasks);
});

app.post('/tasks', (req,res) => {
    const { title, description, status } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        status:'pending'
    }
    tasks.push(newTask)
    res.status(201).send(`Task added ${JSON.stringify(newTask)} `)
});

app.put('/tasks/:id',(req,res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, status } = req.body;
    const task = tasks.find(u => u.id === taskId);

    if(!task){
        return res.status(404).send('Task not found')
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    res.send(`Task updated: ${JSON.stringify(task)}`)
});

app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(u => u.id === taskId);

    if(index === -1){
        return res.status(404).send("Task not found");
    }

    const deletedTask = tasks.splice(index, 1);
    res.send(`Task deleted: ${JSON.stringify(deletedTask[0])}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});