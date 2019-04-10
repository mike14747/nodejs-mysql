"use strict";

var inquirer = require("inquirer");
var connection = require("./connection.js");
var counter = 0;

function promptUser() {
    inquirer.prompt([
        {
            name: "productID",
            message: "\n\nEnter the Product ID of the item you'd like to buy: ",
            validate: function validateID(productID) {
                if (isNaN(productID) || productID < 0) {
                    return false || "ID must be a number greater than 0!";
                }
                return true;
            }
        },
        {
            name: "quantity",
            message: "\n\nEnter the quantity of this item you'd like to purchase: ",
            validate: function validateQuantity(quantity) {
                if (isNaN(quantity) || quantity < 0) {
                    return false || "Quantity must be a number greater than 0!";
                }
                return true;
            }
        }
    ]).then(function (answers) {
        console.log("\nYou entered Product ID: " + answers.productID + " and a quantity of: " + answers.quantity + "\n");
        connection.query("SELECT product_id, product_name, price, stock_quantity FROM products WHERE ? LIMIT 1", { product_id: answers.productID }, function (error, results) {
            if (error) throw error;
            console.log("\nRequested quantity: " + answers.quantity + " | In stock: " + results[0].stock_quantity + "\n");
            if (answers.quantity > results[0].stock_quantity) {
                console.log("There isn't sufficient stock to fill your order. You are trying to purchase " + answers.quantity + " of " + results[0].product_name + ", but we only have " + results[0].stock_quantity + " in stock.");
            } else {
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: results[0].stock_quantity-answers.quantity}, { product_id: results[0].product_id }], function (error, results) {
                    if (error) throw error;
                    console.log(results.changedRows + " row(s) affected.");
                });
                console.log("Your Order:\nQTY: " + answers.quantity + " | Item: " + results[0].product_name + " | Each Cost: " + results[0].price + " | Total Cost: " + results[0].price * answers.quantity);
                console.log("\nThank you for your order!\n");
            }
            connection.end();
        });
    });
}

connection.query("SELECT p.product_id, p.product_name, p.price, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id ORDER BY d.department_id ASC, p.product_id ASC", function (error, results) {
    if (error) throw error;
    console.log("\n=============== Items in the Bamazon Store ===============");
    for (let i = 0; i < results.length; i++) {
        if (results[i].department_id != counter) {
            console.log("\n--------------- " + results[i].department_name + " ---------------");
            counter = results[i].department_id;
        }
        console.log("Product ID: " + results[i].product_id + " - " + results[i].product_name + " ($" + results[i].price + "/ea)");
    }
    promptUser();
});

