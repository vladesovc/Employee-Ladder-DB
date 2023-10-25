// Import and require inquirer
const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
// Running the .env to keep login protected
require("dotenv").config();


// eliminates the need for a connections file
const db = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
    });
    db.connect((err) => {
        if (err) {
          console.error('Error connecting to employees_db.', err);
          return;
        }
        console.log('Connected to the employees_db database.');
        displayMain();
      });

function displayMain() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'Select an option:',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'End Program',
        ],
      })
    .then((answer) => {
        switch (answer.action) {
          case 'View All Departments':
            ViewDepartments();
            break;
          case 'View All Roles':
            ViewRoles();
            break;
          case 'View All Employees':
            ViewEmployees();
            break;
          case 'Add a Department':
            AddDepartment();
            break;
          case 'Add a Role':
            addRole();
            break;
          case 'Add an Employee':
            addEmployee();
            break;
          case 'Update an Employee Role':
            updateEmployeeRole();
            break;
          case 'End Program':
            connection.end();
            break;
        }
      });
  
function ViewDepartments() {
    db.query ('SELECT * FROM department', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function ViewRoles() {
    db.query ('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function ViewEmployees() {
    db.query ('SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN employee manager ON employee.manager_id = manager.id', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function AddDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the new Department Name:',
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO department (name) VALUES (?)';
        db.query(query, [answer.name], (err, results) => {
          if (err) {
            console.error('Fail - Department not Added', err);
          } else {
            console.log('Success! New Department Added');
          }
          displayMain();
        });
      });
  }
}

// name questions after columns the data goes into
