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

function checkout(id, name, qty, price) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + ? WHERE ?", [ qty, (price * qty), { product_id: id }], function (error) {
        if (error) throw error;
    });
    table = new Table({
        head: ['Order QTY', 'Item', 'Each Price', 'Total Cost'],
        colAligns: ['middle', 'left', 'right', 'right']
    });

    table.push(
        [qty, name, '$' + price.toFixed(2), '$' + (price * qty).toFixed(2)]
    );
    console.log("\n\n\n=============== Bamazon Invoice ===============\n");
    console.log(table.toString());
    console.log("\nThank you for your order!\n");
    buyAgain();
}

function promptUser() {
    inquirer.prompt([
        {
            name: "productID",
            type: "number",
            message: "\n\nEnter the Product ID of the item you'd like to buy: ",
            validate: function validateID(productID) {
                if (isNaN(productID)) {
                    return false || "ID must be a number!";
                } else if (productIDArray.indexOf(productID) < 0) {
                    return false || "Product ID not found in the database!"
                }
                return true;
            }
        },
        {
            name: "quantity",
            type: "number",
            message: "\n\nEnter the quantity of this item you'd like to purchase: ",
            validate: function validateQuantity(quantity) {
                if (isNaN(quantity) || quantity < 1 || !Number.isInteger(quantity)) {
                    return false || "Quantity must be a whole number greater than 0!";
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
                let id = result[0].product_id;
                let name = result[0].product_name;
                let qty = answers.quantity;
                let price = result[0].price;
                checkout(id, name, qty, price);
            }
        });
    });
}

function displayInv() {
    connection.query("SELECT p.product_id, p.product_name, p.price, p.stock_quantity, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id WHERE p.stock_quantity>0 ORDER BY d.department_id ASC, p.product_name ASC", function (error, results) {
        if (error) throw error;
        productIDArray = [];
        console.log("\n\n\n==================== Items in the Bamazon Store ====================\n");
        table = new Table({
            head: ['Product ID', 'Item', 'Each Price', 'Department'],
            colAligns: ['middle', 'left', 'right', 'left']
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