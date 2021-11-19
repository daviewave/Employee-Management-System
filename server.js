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
  inquirer.prompt(initialPrompt).then((choice) => {
    switch (choice.task) {
      case "View all Employees?":
        viewAllEmployees();
        break;
    }
  });
}

startEmployeeManager();

//2. Add ability to complete each of the options listed in 1
//view employees
function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.jobTitle, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
}
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

