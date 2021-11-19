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
  console.log("SUCCESS: " + connection.threadId);
});

