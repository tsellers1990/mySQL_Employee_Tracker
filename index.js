const inquirer = require("inquirer");
const mysql = require("mysql");

var dynamicListQ = [];
var dynamicListQ2 = [];

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

    dynamicListQ = []
    for (const department of data) {
        dynamicListQ.push(department.name);
    }
    inquirer
        .prompt ([
        {
            name:"name",
            type: "list",
            choices: dynamicListQ
        },
        {
            name: "newName",
            type: "input",
            message: "What would you like to rename this department to?"
        }
    ]).then((response) => {

        connection.query("UPDATE department SET ? WHERE ?",
        [{
            name : response.newName //set db name to newName 
        },
        {
            name: response.name //where name in db = user se
        }
    ])
    initilize()
    }, (err) =>{if (err) throw err} )    
})
}//done

const  updateRole = () => {
connection.query("SELECT * FROM person_role", (err,data) => {
    if (err) throw err;

    dynamicListQ = [];
    dynamicListQ2 = [];
    for (const role of data) {
        dynamicListQ.push(role.title);
    }
    inquirer
        .prompt ([
            {
                name: "title",
                type: "list",
                choices: dynamicListQ
            }
        ]).then(response => {
            connection.query(`SELECT * FROM person_role WHERE title = ${JSON.stringify(response.title)}`, (err,data) => {
                if (err) throw err;

                for (const info of data) {
                    dynamicListQ2.push(info.title);
                    dynamicListQ2.push(info.salary);
                    dynamicListQ2.push(info.department_id);
                }
                inquirer
                    .prompt ([
                        {
                            name: "selector",
                            type: 'list',
                            choices: ["title", "salary", "department_id"]
                        },
                        {
                            name:"oldInfo",
                            type: "list",
                            message: "Which piece do you want to change?",
                            choices: dynamicListQ2
                             
                        },
                        {
                            name: "newInfo",
                            type: "prompt",
                            message: "Change that info to what?"
                        }
                    ]).then (responseNest => {
                        switch(responseNest.selector) {
                            case "title":                               
                                // update person_role set newInfo where title=dynamiclistchoice
                                connection.query("UPDATE person_role SET ? WHERE ?", 
                                [
                                    {
                                        title : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        title : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                break;

                            case "salary":
                                connection.query("UPDATE person_role SET ? WHERE ?", 
                                [
                                    {
                                        salary : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        salary : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                break;
                            case "department_id":
                                connection.query("UPDATE person_role SET ? WHERE ?", 
                                [
                                    {
                                        department_id : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        department_id : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                
                                break;

                                
                        } initilize();
                    },(err) => {if (err) throw err})
            })
        })
    }) 
    }

const updateEmployee = () => {
connection.query("SELECT * FROM employee", (err,data) => {
    if (err) throw err;

    dynamicListQ = [];
    dynamicListQ2 = [];
    for (const employee of data) {
        dynamicListQ.push(employee.first_name);
    }
    inquirer
        .prompt ([
            {
                name: "name",
                type: "list",
                choices: dynamicListQ
            }
        ]).then(response => {
            connection.query(`SELECT * FROM employee WHERE first_name = ${JSON.stringify(response.name)}`, (err,data) => {
                if (err) throw err;

                for (const info of data) {
                    dynamicListQ2.push(info.first_name);
                    dynamicListQ2.push(info.last_name);
                    dynamicListQ2.push(info.role_id);
                    dynamicListQ2.push(info.manager_id);
                }
                inquirer
                    .prompt ([
                        {
                            name: "selector",
                            type: 'list',
                            choices: ["first_name", "last_name", "role_id", "manager_id"]
                        },
                        {
                            name:"oldInfo",
                            type: "list",
                            message: "Which piece do you want to change?",
                            choices: dynamicListQ2
                                
                        },
                        {
                            name: "newInfo",
                            type: "prompt",
                            message: "Change that info to what?"
                        }
                    ]).then (responseNest => {
                        switch(responseNest.selector) {
                            case "first_name":                               
                                // update person_role set newInfo where title=dynamiclistchoice
                                connection.query("UPDATE first_name SET ? WHERE ?", 
                                [
                                    {
                                        first_name : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        first_name : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                break;

                            case "last_name":
                                connection.query("UPDATE last_name SET ? WHERE ?", 
                                [
                                    {
                                        last_name : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        last_name : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                break;
                            case "role_id":
                                connection.query("UPDATE role_id SET ? WHERE ?", 
                                [
                                    {
                                        role_id : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        role_id : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                
                                break;
                            case "manager_id":
                                connection.query("UPDATE manager_id SET ? WHERE ?", 
                                [
                                    {
                                        manager_id : responseNest.newInfo //~~~~~set db title to newTitle 
                                    },
                                    {
                                        manager_id : responseNest.oldInfo //~~~~~~//where title in db = user selection
                                    }
                                ]);
                                
                                break;
                            

                                
                        } initilize();
                    },(err) => {if (err) throw err})
            })
        })
    }) 
}


//update person_role set newInfo where title=dynamiclistchoice
// connection.query("UPDATE person_role SET ? WHERE ?", 
//                                 [
//                                     {
//                                         title : responseNest.newInfo //~~~~~set db title to newTitle 
//                                     },
//                                     {
//                                         title : responseNes.oldInfo //~~~~~~//where title in db = user selection
//                                     }
//                                 ]);


//we'll fs need to have a shitload of functions here. this is a big project

initilize();