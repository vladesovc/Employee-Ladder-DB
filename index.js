const inquirer = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');

require("dotenv").config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
    },
    console.log('Connected to the employees_db database.')
);

function ViewDepartments() {
    db.query ('SELECT * FROM department', (err, results) => {
        console.table(results);
    });
}

function ViewRoles() {
    db.query ('SELECT role.id, role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
        console.table(results);
    });
}

function ViewEmployees() {
    db.query ('SELECT employee.id, employee.first_name, employee.last_name, role.title, manager.first_name AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN employee manager ON employee.manager_id = manager.id', (err, results) => {
        console.table(results);
    });
}



// name questions after columns the data goes into
