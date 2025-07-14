const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {
   useNewUrlParser: true,
   useUnifiedTopology: true 
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error: ',err);
});
const employeeSchema = new mongoose.Schema({
    empID: {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    department: String,
    designation: String,
    salary: Number
  });
  
const Employee = mongoose.model('Employee',employeeSchema);
app.post('/add',async (req, res) => {
    try{
        const newEmployee = new Employee(req.body);
        const result = await newEmployee.save();
        res.json({message: 'Employee added'});
    }catch(error){
        res.status(500).json({error});
    }
});
app.get('/Employee/:empID', async (req, res) => {
    try {
      const employee = await Employee.findOne({ empID: Number(req.params.empID) });  // Use a different variable name & typecast if empID is Number
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
app.put('/update/:empID', async (req, res) => {
    try{
        const updated = await Employee.findOneAndUpdate(
            { empID: req.params.empID },
            req.body,
            { new: true }
        );
        res.json({message : 'Employee updated', updated });
    } catch(error){
        res.status(500).json({ error });
    }
});
app.delete('/delete/:empID', async (req,res) => {
    try{
        const deleted = await Employee.findOneAndDelete({empID:req.params.empID});
        res.json({message:'Employee deleted',deleted});
    } catch(error){
        res.status(500).json({error});
    }
});
app.listen(3000, ()=>{
    console.log('Server running on http://localhost:3000');
});