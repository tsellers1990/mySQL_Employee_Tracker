const inquirer = require("inquirer");
const mysql = require("mysql");

var dynamicListQ = [];

var connection = mysql.createConnection({
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
        choices: ["Add", "View", "Update", "Exit"]
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

connection.connect(function (err){
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
                case "Exit":
                    connection.end();
            }
        })

}//done

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
}//done

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
}//done

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
} //done

const addDepartment = () => {
 inquirer
    .prompt([
        {
            name: "name",
            message: "What new Department would you like to add?"
        }        
    ]).then(({name}) => {
        connection.query("INSERT INTO department SET ?", {
            name
        }, (err) => {
            if (err) throw err;
            console.log(`${name} submitted to the DB`);
        })
        initilize();
    }) 

} //done

const addRole = () => {
    inquirer
    .prompt([
        {
            name: "title",
            message: "What new Title would you like to add?"
        },
        {
            name: "salary",
            message: "What salary does this Role carry?"
        },
        {
            name: "department_id",
            message: "What is the id of the new Role"
        }
    ]).then(({title, salary, department_id}) => {
        connection.query("INSERT INTO person_role SET ?", {
            title: title,
            salary: salary,
            department_id: department_id
        }, (err) => {
            if (err) throw err;
            console.log(`${title} submitted to the DB`);
            
        })
        initilize();
    })
} //done

const addEmployee = () => {
    inquirer
    .prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            message: "What is the id of the their Role"
        },
        {
            name: "manager_id",
            message: "What is their Managers Id? (1 if they are a manager)"
        }
    ]).then(({first_name, last_name, role_id, manager_id}) => {
        connection.query("INSERT INTO employee SET ?", {
            first_name,
            last_name,
            role_id,
            manager_id
        }, (err) => {
            if (err) throw err;
            console.log(`${first_name} ${last_name} submitted to the DB`);
        })
        initilize();
    })  
} //done

const viewDepartment = () => {
connection.query("SELECT * FROM department", (err, data) => {
    if(err) throw err;

    for(const department of data) {
        console.log(`Department: ${department.name}`)
    }
    initilize();
})
} //done

const viewRole = () => {
connection.query("SELECT * FROM person_role", (err, data) => {
    if(err) throw err;

    for(const role of data) {
        console.log(`Role: ${role.title}`)
    }
    initilize();
}) 
} //done

const viewEmployee = () => {
connection.query("SELECT * FROM employee", (err, data) => {
    if(err) throw err;

    for(const employee of data) {
        console.log(`Employee: ${employee.first_name} ${employee.last_name}`)
    }
    initilize();
})
} //done

const updateDepartment = () => {
connection.query("SELECT * FROM department", (err, data) => {
    if (err) throw err;

    for (const department of data) {
        // dynamicList += JSON.stringify(department);
        console.log(`response ${department.id}: ${department.name}`)
        dynamicListQ.push(department.name);

    }

    console.log(dynamicListQ)
    inquirer
        .prompt ([
        {
            name:"dynamicList",
            type: "list",
            choices: dynamicListQ
        }
    ]).then((response) => {
        // connection.query("")
        console.log(response)
    }, (err) =>{if (err) throw err} )

        // .then(({first_name, last_name, role_id, manager_id}) => {
        //     connection.query("INSERT INTO employee SET ?", {
        //         first_name,
        //         last_name,
        //         role_id,
        //         manager_id
        //     }, (err) => {
        //         if (err) throw err;
        //         console.log(`${first_name} ${last_name} submitted to the DB`);
        //     })
    
    
})//query to the DB
//we'll need more questions to ask the user to see what they want to change...
//consider appending the current list to an array, then allowing the user to select from...
//that array!

///dynamicList
}

const  updateRole = () => {
    
}

const updateEmployee = () => {
    
}



//we'll fs need to have a shitload of functions here. this is a big project

initilize();