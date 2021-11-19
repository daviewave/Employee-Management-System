//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "dsilveira",
  password: "Walterwhite123",
  database: "employee_management_DB",
  insecureAuth: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("SUCCESS: CONNECTED TO PORT: 3306");
});

//1. Ask the user what they would like to do
//2. Add ability to complete each of the options listed in 1
//view employees
//view employees by role
//view employees by department
//update employees
//add employees
//update employees
//add roles
//add departments


