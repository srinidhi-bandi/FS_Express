import express from 'express';

const app = express();
const port = 3700;

app.use(express.json());
let students = [
    {id: 1, name: "Srinidhi", course: "MCA"},
    {id: 2, name: "Sabira", course: "BMS"},
    {id: 3, name: "Aryan", course: "BMM"}
];

app.get('/students', (req, res) => {
    res.send(students);
});

app.post('/students', (req,res) => {
    const { name, course } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        course
    }
    students.push(newStudent)
    res.status(201).send(`Student added ${JSON.stringify(newStudent)}`)
});

app.put('/students/:id',(req,res) => {
    const studentId = parseInt(req.params.id);
    const { name, course } = req.body;
    const student = students.find(u => u.id === studentId);

    if (!student){
        return res.status(404).send('Book not found');
    }

    student.name = name || student.name;
    student.course = course || student.course;

    res.send(`Student updated: ${JSON.stringify(student)})`);
});

app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(u => u.id === studentId);

    if (index === -1){
        return res.status(404).send('Book not found');
    }

    const deletedStudent = students.splice(index, 1);
    res.send(`Student deleted: ${JSON.stringify(deletedStudent[0])}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});