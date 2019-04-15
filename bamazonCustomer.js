"use strict";

var inquirer = require("inquirer");
var connection = require("./connection.js");
var Table = require('cli-table');

var productIDArray = [];
var table = {};

function buyAgain() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "\n\nWould you like to buy another product?\n",
            choices: ["Yes", "No"]
        }
    ]).then(function (answers) {
        if (answers.choice === "Yes") {
            displayInv();
        } else {
            connection.end();
        }
    });
}

function promptUser() {
    inquirer.prompt([
        {
            name: "productID",
            message: "\n\nEnter the Product ID of the item you'd like to buy: ",
            validate: function validateID(productID) {
                if (isNaN(productID) || parseInt(productID) <= 0) {
                    return false || "ID must be a number greater than 0!";
                } else if (productIDArray.indexOf(parseInt(productID)) < 0) {
                    return false || "Product ID not found in the database!"
                }
                return true;
            }
        },
        {
            name: "quantity",
            message: "\n\nEnter the quantity of this item you'd like to purchase: ",
            validate: function validateQuantity(quantity) {
                if (isNaN(quantity) || quantity < 1) {
                    return false || "Quantity must be a number greater than 0!";
                }
                return true;
            }
        }
    ]).then(function (answers) {
        connection.query("SELECT product_id, product_name, price, stock_quantity FROM products WHERE ? LIMIT 1", { product_id: answers.productID }, function (error, result) {
            if (error) throw error;
            if (result.length === 0) {
                console.log("\nNo products found matching that Product ID.\n");
            } else if (result[0].stock_quantity < answers.quantity) {
                console.log("\nThere isn't sufficient stock to fill your order. We only have " + result[0].stock_quantity + " in stock.");
                promptUser();
            } else {
                connection.query("UPDATE products SET ?, product_sales = product_sales + ? WHERE ?", [{ stock_quantity: result[0].stock_quantity - answers.quantity }, result[0].price * answers.quantity, { product_id: result[0].product_id }], function (error) {
                    if (error) throw error;
                });
                table = new Table({
                    head: ['Order QTY', 'Item', 'Each Price', 'Total Cost']
                });

                table.push(
                    [answers.quantity, result[0].product_name, '$' + result[0].price, '$' + (result[0].price * answers.quantity).toFixed(2)]
                );
                console.log("\n\n" + table.toString());
                console.log("\nThank you for your order!\n");
                buyAgain();
            }
        });
    });
}

function displayInv() {
    connection.query("SELECT p.product_id, p.product_name, p.price, p.stock_quantity, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id WHERE p.stock_quantity>1 ORDER BY d.department_id ASC, p.product_name ASC", function (error, results) {
        if (error) throw error;
        productIDArray = [];
        console.log("\n\n\n==================== Items in the Bamazon Store ====================\n");
        table = new Table({
            head: ['Product ID', 'Item', 'Each Price', 'Department']
        });
        for (let i = 0; i < results.length; i++) {
            productIDArray.push(results[i].product_id);
            table.push(
                [results[i].product_id, results[i].product_name, '$' + results[i].price, results[i].department_name]
            );
        }
        console.log(table.toString());
        promptUser();
    });
}

connection.connect(function (err) {
    if (err) throw err;
    displayInv();
});