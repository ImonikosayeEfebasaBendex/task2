//importing the express module
const express = require("express");

//create an Express application
const app = express();

app.use(express.json())

// creating a port for the application
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> {
    console.log(`app Listening on port ${PORT}...`);
});

// creat data for the app
const students = [
    {
        id: 1,
        name: "Favour Danjuma",
        dept: "computer Engineering",
        age: "30years"
    },

    {
        id: 2,
        name: "Bendex Base",
        dept: "Mechnaical Engineering",
        age: "23years",
    },

    {
        id: 3,
        name: "Gloria Despogin",
        dept: "labouractory Technician",
        age: "34years"
    }
]

//get the list of student in database
app.get("/students", (req, res)=> {
    res.status(200).send(students); 
});

//get a single student from database
app.get("/students/:id", (req, res)=> {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) res.status(404).send("student with id not found")
    res.send(student)
});

// update the entire student data
app.put("/students/:id", (req, res)=> {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) res.status(404).send("student with id not found")

    //input validation
    if(!req.body.name || req.body.length < 3) {
        res.status(400).send("name is required and should be more than 3 character")
    }
    //update student
    student.name = req.body.name,
    student.dept = req.body.dept,
    student.age = req.body.age

    res.send(student);


})

// creat a New students to the database with id
app.post("/students/create", (req, res)=> {

     //input validation
     if(! req.body.name || req.body.length < 3) {
        res.status(400).send("name is required and should be more than 3 character")
    }
    const student = {
        id: students.length + 1,
        name: req.body.name,
        dept: req.body.dept,
        age: req.body.age
    };
    students.push(student);
    res.send(student)
})

//Delete a particular student from the database
app.delete("/students/delete/:id", (req, res)=> {
    
    //check if student exist
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) res.status(404).send("student with id not found")

    //delete 1 student from database
    const index = students.indexOf(student);
    students.splice(index, 1);

    //return the deleted student data
    res.send(`student with id number ${req.params.id} has been deleted successfully `)
})
