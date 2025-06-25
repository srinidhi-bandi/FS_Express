import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
let users = [
    {id: 1, name : 'jude', email: 'jude@hotmail.com'},
    {id: 2, name : 'carlo', email : 'carlo@yahoo.com'},
];

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req,res) => {
    const { name, email } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email
    }
    users.push(newUser)
    res.status(201).send(`User added ${JSON.stringify(newUser)}`)
});

app.put('/users/:id',(req,res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);

    if (!user){
        return res.status(404).send('User not found');
    }

    user.name = name || user.name;
    user.email = email || user.email;

    res.send(`User updated: ${JSON.stringify(user)})`);
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1){
        return res.status(404).send('User not found');
    }

    const deletedUser = users.splice(index, 1);
    res.send(`User deleted: ${JSON.stringify(deletedUser[0])}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});