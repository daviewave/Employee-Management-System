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
const initialPrompt = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View all Employees?",
      "View Employees by Role?",
      "View Employees by Deparment",
      "Add New Employee?",
      "Update Existing Employee?",
      "Add Role?",
      "Add Department?",
    ],
  },
];
function startEmployeeManager() {
  inquirer.prompt(initialPrompt).then((choice) => {});
}

startEmployeeManager();

//2. Add ability to complete each of the options listed in 1
//view employees
function viewAllEmployees() {}
//view employees by role
function viewEmployeeByRole() {}
//view employees by department
function viewEmployeeByDepartment() {}
//update employees
function updateEmployee() {}
//add employees
function addEmployee() {}
//add roles
function addRole() {}
//add departments
function addDepartment() {}

