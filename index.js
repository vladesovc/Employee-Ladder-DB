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
            viewDepartments();
            break;
          case 'View All Roles':
            viewRoles();
            break;
          case 'View All Employees':
            viewEmployees();
            break;
          case 'Add a Department':
            addDepartment();
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
  
function viewDepartments() {
    db.query ('SELECT * FROM department', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function viewRoles() {
    db.query ('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function viewEmployees() {
    db.query ('SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN employee manager ON employee.manager_id = manager.id', (err, results) => {
        console.table(results);
        displayMain();
    });
}

function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the new Department name?',
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

function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the new Role title?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the annual salary for said role?',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Please enter the correspoinding Department ID for this Role:',
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answer.title, answer.salary, answer.department_id], (err, results) => {
          if (err) {
            console.error('Fail - Role Not Added.', err);
          } else {
            console.log('Success! New Role Added');
          }
          displayMain();
        });
      });
    }
    function addEmployee() {
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: "Please input the employee's First Name:",
            },
            {
              type: 'input',
              name: 'last_name',
              message: "Please input the employee's Last Name:",
            },
            {
              type: 'input',
              name: 'role_id',
              message: "Please input the employee's Role ID:",
            },
            {
              type: 'input',
              name: 'manager_id',
              message: "Please input the employee's Manager ID (if none, then leave empty):",
            },
          ])
          .then((answer) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            db.query(
              query,
              [answer.first_name, answer.last_name, answer.role_id, answer.manager_id || null],
              (err, results) => {
                if (err) {
                  console.error('Fail - New Employee Not Added', err);
                } else {
                  console.log('Success! New Employee Added');
                }
                displayMain();
              }
            );
          });
      }    
}
