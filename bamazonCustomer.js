"use strict";

var inquirer = require("inquirer");
var connection = require("./connection.js");
var counter = 0;
var productIDArray = [];
var curID = 0;
var quantityArray = [];

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
                curID = productIDArray.indexOf(parseInt(productID));
                return true;
            }
        },
        {
            name: "quantity",
            message: "\n\nEnter the quantity of this item you'd like to purchase: ",
            validate: function validateQuantity(quantity) {
                if (isNaN(quantity) || quantity < 0) {
                    return false || "Quantity must be a number greater than 0!";
                } else if (quantityArray[curID] < quantity) {
                    return false || "There isn't sufficient stock to fill your order. We only have " + quantityArray[curID] + " in stock.";
                }
                return true;
            }
        }
    ]).then(function (answers) {
        console.log("\nYou entered Product ID: " + answers.productID + " and a quantity of: " + answers.quantity + "\n");
        connection.query("SELECT product_id, product_name, price, stock_quantity FROM products WHERE ? LIMIT 1", { product_id: answers.productID }, function (error, results) {
            if (error) throw error;
            if (results.length === 0) {
                console.log("\nNo products found matching that Product ID.\n");
            } else {
                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: results[0].stock_quantity - answers.quantity }, { product_id: results[0].product_id }], function (error) {
                    if (error) throw error;
                });
                console.log("Your Order:\nQTY: " + answers.quantity + " | Item: " + results[0].product_name + " | Each Cost: " + results[0].price + " | Total Cost: " + (results[0].price * answers.quantity).toFixed(2));
                console.log("\nThank you for your order!\n");
                buyAgain();
            }
        });
    });
}

function displayInv() {
    connection.query("SELECT p.product_id, p.product_name, p.price, p.stock_quantity, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id ORDER BY d.department_id ASC, p.product_id ASC", function (error, results) {
        if (error) throw error;
        console.log("\n=============== Items in the Bamazon Store ===============");
        for (let i = 0; i < results.length; i++) {
            productIDArray.push(results[i].product_id);
            quantityArray.push(results[i].stock_quantity);
            if (results[i].department_id != counter) {
                console.log("\n--------------- " + results[i].department_name + " ---------------");
                counter = results[i].department_id;
            }
            console.log("Product ID: " + results[i].product_id + " - " + results[i].product_name + " ($" + results[i].price + "/ea)");
        }
        promptUser();
    });
}

connection.connect(function (err) {
    if (err) throw err;
    displayInv();
});