"use strict"

var inquirer = require("inquirer");
var connection = require("./connection.js");
var Table = require('cli-table');

var table = {};

function viewSales() {
    connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) AS product_sales, (SUM(p.product_sales)-d.over_head_costs) AS total_profit FROM departments AS d INNER JOIN products AS p ON d.department_id=p.department_id GROUP BY d.department_id ORDER BY d.department_id ASC", function (error, results) {
        if (error) throw error;
        table = new Table({
            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
            colAligns: ['middle', 'left', 'right', 'right', 'right']
        });
        for (let i=0; i<results.length; i++) {
            table.push(
                [results[i].department_id, results[i].department_name, (results[i].over_head_costs).toFixed(2), (results[i].product_sales).toFixed(2), (results[i].total_profit).toFixed(2)]
            );
        }
        console.log("\n\n" + table.toString());
        promptSuper();
    });
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
    ]).then(function (answer) {
        connection.query("INSERT INTO departments SET ?", { department_name: answer.newDepart }, function (error) {
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
            message: "\n\nChoose your action:",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(function (answer) {
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