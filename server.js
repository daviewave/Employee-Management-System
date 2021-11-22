//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

let employeeRole = [];
let managers = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "dsilveira",
  password: "Walterwhite123",
  database: "employee_management_DB",
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("SUCCESS: CONNECTED TO PORT: 3306");
  startEmployeeManager();
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

      case "View Employees by Role?":
        viewEmployeeByRole();
        break;

      case "View Employees by Deparment":
        viewEmployeeByDepartment();
        break;

      case "Add New Employee?":
        addEmployee();
        break;

      case "Update Existing Employee?":
        updateEmployee();
        break;

      case "Add Role?":
        addRole();
        break;

      case "Add Department?":
        addDepartment();

      default:
        break;
    }
  });
}

//2. Add ability to complete each of the options listed in 1
//view employees
function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.jobTitle, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startEmployeeManager();
    }
  );
}

//view employees by role
function viewEmployeeByRole() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.jobTitle AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
    }
  );
}

//view employees by department
function viewEmployeeByDepartment() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}

let listOfRoles = [];
function chooseRole() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      listOfRoles.push(res[i].jobTitle);
    }
  });
  return listOfRoles;
}

let listOfManagers = [];
function chooseManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        listOfManagers.push(res[i].first_name);
      }
    }
  );
  return listOfManagers;
}
const addEmployeePrompt = [
  {
    type: "input",
    name: "firstName",
    message: "Enter their first name ",
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter their last name ",
  },
  {
    type: "list",
    name: "role",
    message: "What is their role? ",
    choices: chooseRole(),
  },
  {
    type: "rawlist",
    name: "choice",
    message: "Whats their managers name?",
    choices: chooseManager(),
  },
];

function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.jobTitle FROM employee JOIN role ON employee.role_id = role.id;",
    (err, res) => {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastname",
            type: "rawlist",
            message: "What is the Employee's last name? ",
            choices: () => {
              let lastname = [];
              for (var i = 0; i < res.length; i++) {
                lastname.push(res[i].last_name);
              }
              return lastname;
            },
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: chooseRole(),
          },
        ])
        .then((val) => {
          let roleId = chooseRole().indexOf(val.role) + 1;
          connection.query(
            "UPDATE employee SET WHERE ?",
            {
              last_name: val.lastname,
            },
            {
              role_id: roleId,
            },
            (err) => {
              if (err) throw err;
              console.table(val);
            }
          );
        });
    }
  );
}
//add employees
function addEmployee() {
  inquirer.prompt(addEmployeePrompt).then((val) => {
    let roleId = chooseRole().indexOf(val.role) + 1;
    let managerId = chooseManager().indexOf(val.choice) + 1;
    connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId,
      },
      (err) => {
        if (err) throw err;

        console.table(val);
      }
    );
  });
}

const addRolePrompt = [
  {
    type: "input",
    name: "jobTitle",
    message: "What is the roles job title?",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the Salary?",
  },
];
//add roles
function addRole() {
  connection.query(
    "SELECT role.jobTitle AS Title, role.salary AS Salary FROM role",
    (err, res) => {
      inquirer.prompt(addRolePrompt).then((res) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            jobTitle: res.jobTitle,
            salary: res.salary,
          },
          (err) => {
            if (err) throw err;
            console.table(res);
          }
        );
      });
    }
  );
}

const addDepartmentPrompt = [
  {
    type: "input",
    name: "name",
    message: "What Department would you like to add?",
  },
];
//add departments
function addDepartment() {
  inquirer.prompt(addDepartmentPrompt).then((res) => {
    connection.query(
      "INSERT INTO department SET ? ",
      {
        name: res.name,
      },
      (err) => {
        if (err) throw err;
        console.table(res);
      }
    );
  });
}

