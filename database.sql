DROP DATABASE IF EXISTS employee_list;

CREATE DATABASE employee_list;

USE employee_list;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE person_role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) DEFAULT "janitor",
    salary DECIMAL (10,2),
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT
);

INSERT INTO department (name) VALUES("Test");
SELECT * FROM department;

INSERT INTO person_role (title, salary, department_id) VALUES("Test", 420.69, 1);
SELECT * FROM department;


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("Tymothy", "Sellers", 1, 1);
SELECT * FROM employee;
