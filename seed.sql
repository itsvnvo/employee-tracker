
USE employee_listDB;

INSERT INTO department(names)
VALUES 
('Management'),
('Development'),
('Engineer'),
('Human Resources'),
('Accounting');

INSERT INTO roles(title, salary, department_id)
VALUES
('General Manager', 100000, 1),
('Programmer', 67000, 2),
('HR Rep', 72000, 4),
('Engineer worker', 95000, 3),
('Accountant', 89000, 5);

INSERT INTO employees(first_name, last_name, role_id) 
VALUES
('Vincent', 'Waffle', 1),
('Richard', 'Chimkin', 2),
('Sheena', 'style', 4),
('Brian', 'Whopper', 3),
('Kao', 'Ken', 5);

UPDATE `employee_listDB`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');