const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/studentDB', {
   useNewUrlParser: true,
   useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error: ',err);
});
const studentSchema = new mongoose.Schema({
    name: String,
    rollNo: Number,
    course: String
});
const Student = mongoose.model('Student',studentSchema);
app.post('/add',async (req, res) => {
    try{
        const newStudent = new Student(req.body);
        const result = await newStudent.save();
        res.json({message: 'Student added'});
    }catch(error){
        res.status(500).json({error});
    }
});
app.get('/student/:rollNo',async (req, res) => {
    try{
        const student = await Student.findOne({rollNo: req.params.rollNo})
        res.json(student);
    }
    catch(error){
        res.status(500).strictContentLength({ error });
    }
});
app.put('/update/:rollNo', async (req, res) => {
    try{
        const updated = await Student.findOneAndUpdate(
            { rollNo: req.params.rollNo },
            req.body,
            { new: true }
        );
        res.json({message : 'Student updated', updated });
    } catch(error){
        res.status(500).json({ error });
    }
});
app.delete('/delete/:rollNo', async (req,res) => {
    try{
        const deleted = await Student.findOneAndDelete({rollNo:req.params.rollNo});
        res.json({message:'Student deleted',deleted});
    } catch(error){
        res.status(500).json({error});
    }
});
app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000');
});