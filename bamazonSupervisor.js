"use strict"

var inquirer = require("inquirer");
var connection = require("./connection.js");

function viewSales() {

}

function newDepartment() {
    inquirer.prompt([
        {
            name: "newDepart",
            type: "input",
            message: "Enter the name of the new department:",
            validate: function (newDepart) {
                if (newDepart.length < 1) {
                    return false || "The new department name field cannot be blank!"
                }
                return true;
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO departments SET ?", {department_name: answer.newDepart}, function (error) {
            if (error) throw error;
            console.log("\n'" + answer.newDepart + "' has been added to the departments table in the database.\n")
            promptSuper();
        });
    });
}

function promptSuper() {
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "Choose your action:",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(function(answer) {
        if (answer.action === "View Product Sales by Department") {
            viewSales();
        } else if (answer.action === "Create New Department") {
            newDepartment();
        } else {
            connection.end();
        }
    });
}

connection.connect(function (err) {
    if (err) throw err;
    promptSuper();
});