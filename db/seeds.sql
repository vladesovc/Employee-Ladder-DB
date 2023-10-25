use employees_db;

INSERT INTO department
    (name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Logistics');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 80000, 1),
    ('Sales Representative', 60000, 1),
    ('Software Engineer', 85000, 2),
    ('Data Engineer', 90000, 2),
    ('Financial Analyst', 75000, 3),
    ('Accountant', 68000, 3),
    ('Logistics Coordinator', 65000, 4),
    ('Warehouse Manager', 78000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Eleanor', 'Roberts', 1, 1),
    ('Sebastian', 'Harrison', 2, 1),
    ('Aria', 'Chen', 3, 1),
    ('Liam', 'Jackson', 4, 3),
    ('Aurora', 'Nguyen', 5, 1),
    ('Caleb', 'Gomez', 6, 5),
    ('Luna', 'Brown', 7, 1),
    ('Kai', 'Williams', 8, 7);