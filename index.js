const inquirer = require("inquirer");
const mysql = require("mysql");

var connetion = mysql.createConnection({
    host: "localhost",
    prot: 3306,
    user: "root",
    password: "Sioncala1!",
    database: "employee_list"    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~put the database name here :)
})

const q1Init = [
    {
        name: "baseInit",
        type: "list",
        choices: ["Add", "View", "Update"]
    }
]
const addQ = [
    {
        name: "addInit",
        type: "list",
        choices: ["Add Department", "Add Role", "Add Employee"]
    }
]
const viewQ = [
    {
        name: "viewInit",
        type: "list",
        choices: ["View Department", "View Role", "View Employee"]
    }
]
const updateQ = [
    {
        name: "updateInit",
        type: "list",
        choices: ["Update Department", "Update Role", "Update Employee"]
    }
]

connetion.connect(function (err){
    if (err) throw err;
    //put the starter function execution in here please
})

const initilize = () => {
    //some code in here to initialize the good stuff
    //use inquirer then output the answer into some more stuff
    inquirer 
        .prompt(q1Init).then(function(answer){
            switch (answer.baseInit){
                case "Add":
                    addFunction();
                    break;
                case "View":
                    viewFunction();
                    break;
                case "Update":
                    updateFunction();
                    break;
            }
        })

}

const addFunction = () => {
    inquirer 
    .prompt(addQ).then(function(answer){
        switch (answer.addInit){
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
        }
    })
}

const viewFunction = () => {
    inquirer 
    .prompt(viewQ).then(function(answer){
        switch (answer.viewInit){
            case "View Department":
                viewDepartment();
                break;
            case "View Role":
                viewRole();
                break;
            case "View Employee":
                viewEmployee();
                break;
        }
    })  
}

const updateFunction = () => {
    inquirer 
    .prompt(updateQ).then(function(answer){
        switch (answer.updateInit){
            case "Update Department":
                updateDepartment();
                break;
            case "Update Role":
                updateRole();
                break;
            case "Update Employee":
                updateEmployee();
                break;
        }
    })
}

const addDepartment = () => {
 
}

const addRole = () => {
    
}

const addEmployee = () => {
    
}

const viewDepartment = () => {

}

const viewRole = () => {
    
}

const viewEmployee = () => {
    
}

const updateDepartment = () => {
    
}

const  updateRole = () => {
    
}

const updateEmployee = () => {
    
}



//we'll fs need to have a shitload of functions here. this is a big project

initilize();