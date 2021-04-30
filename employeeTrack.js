const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employee_listDB',
});

connection.connect((err) => {
    if (err) throw err;
    init();
});

const init = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add a department',
                'Add roles',
                'Add employee',
                'View Departments',
                'View Roles',
                'View Employees',
                'Update employee roles',
                'Exit'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department':
                    addDeparment();
                    break;

                case 'Add roles':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'View Departments':
                    viewDeparment();
                    break;

                case 'View Roles':
                    viewRoles();
                    break;

                case 'View Employees':
                    viewEmployees();
                    break;

                case 'Update employee roles':
                    updateEmployee();
                    break;

                case 'Exit':
                    connection.end();
                    console.log('You have exited')
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
// prompts department questions if selected in init
const addDeparment = () => {
    inquirer
        .prompt([
            {
                name: 'addDepart',
                type: 'input',
                message: 'What is the name of the department?',
            }
        ]).then((answer) => {
            connection.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.addDepart
                }, (err) => {
                    if (err) throw err;
                    console.log('Your department was made!');
                    init();
                }
            )
        })
}
// prompts employee questions if selected in init
const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'firstname',
                type: 'input',
                message: 'What is the first name of the employee?',
            },
            {
                name: 'lastname',
                type: 'input',
                message: 'What is the last name of the employee?',
            },
            {
                name: 'employeeID',
                type: 'input',
                message: 'What is the employees ID number?',
            },
            {
                name: 'managerID',
                type: 'input',
                message: 'What is the managers ID?',
            },
        ]).
        then((answer) => {
            connection.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.employeeID,
                    manager_id: answer.managerID
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your employee was made!');
                    init();
                }
            );
        });
};
// prompts role questions if selected in init
const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the employee?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the employee?',
            },
            {
                name: 'departmentID',
                type: 'input',
                message: 'What is the employees department ID?',
            }
        ]).
        then((answer) => {
            connection.query(
                'INSERT INTO roles SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID,
                },
                (err) => {
                    if (err) throw err;
                    console.log('Your role was made!');
                    init();
                }
            );
        });
};

const updateEmployee = () => {

    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices() {
                        let lastNameArr = [];
                        res.forEach(({ last_name }) => {
                            lastNameArr.push(last_name);
                        })
                        return lastNameArr;
                    },
                    message: 'Which employee would you like to change?',
                },
                {
                    name: "newRole",
                    type: "input",
                    message: "What role ID would you like to change it to?",
                }
            ]).
            then((answer) => {
                const emp = `SELECT * FROM employee_listDB.employees;`
                connection.query('UPDATE employees SET ? WHERE ?',
                    [
                        {
                            role_id: answer.newRole,
                        },
                        {
                            last_name: answer.lastName
                        }
                    ],
                    (err) => {
                        if (err) throw err;
                        console.log('You updated your employee!');
                        init();
                    }
                );
            });
    });
};


const viewEmployees = () => {
    connection.query(`SELECT * FROM employee_listDB.employees;`, (err, res) => {
        if (err) throw err;
        console.table(res)
        init();
    });
}

const viewRoles = () => {
    connection.query(`SELECT * FROM employee_listDB.roles;`, (err, res) => {
        if (err) throw err;
        console.table(res)
        init();
    });
}

const viewDeparment = () => {
    connection.query(`SELECT * FROM employee_listDB.department;`, (err, res) => {
        if (err) throw err;
        console.table(res)
        init();
    });
}

