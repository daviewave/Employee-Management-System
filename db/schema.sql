-- 1. Drop the desired database if it exists then create a new one
DROP DATABASE IF EXISTS employee_management_DB;
CREATE DATABASE employee_management_DB;

-- 2. 'use' the correct db
USE employee_management_DB

-- 3. Create tables
-- 3.a. department table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);
-- 3.b. role within department table
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  jobTitle VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
-- 3.c. employee table
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  manager_id INT,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- 4. add select statements
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;