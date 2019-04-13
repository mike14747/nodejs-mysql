"use strict";

var inquirer = require("inquirer");
var connection = require("./connection.js");

var counter = 0;
var departmentsArray = [];
var departmentIDArray = [];

function displayInv() {
    connection.query("SELECT p.product_id, p.product_name, p.price, p.stock_quantity, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id ORDER BY d.department_id ASC, p.product_id ASC", function (error, results) {
        if (error) throw error;
        console.log("\n=============== Complete Bamazon Inventory ===============");
        for (let i = 0; i < results.length; i++) {
            if (results[i].department_id != counter) {
                console.log("\n--------------- " + results[i].department_name + " ---------------");
                counter = results[i].department_id;
            }
            console.log("Product ID: " + results[i].product_id + " | " + results[i].product_name + " ($" + results[i].price + "/ea) | Units in Stock: " + results[i].stock_quantity);
        }
        promptManager();
    });
}

function lowInv() {
    connection.query("SELECT p.product_id, p.product_name, p.price, p.stock_quantity, d.department_id, d.department_name FROM products AS p INNER JOIN departments AS d ON p.department_id=d.department_id WHERE p.stock_quantity <=50 ORDER BY d.department_id ASC, p.stock_quantity DESC", function (error, results) {
        if (error) throw error;
        console.log("\n=============== Bamazon Low Inventory List ===============");
        if (results.length < 1) {
            console.log("\nThere are no products with low inventories!\n");
        } else {
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_id != counter) {
                    console.log("\n--------------- " + results[i].department_name + " ---------------");
                    counter = results[i].department_id;
                }
                console.log("Product ID: " + results[i].product_id + " | " + results[i].product_name + " ($" + results[i].price + "/ea) | Units in Stock: " + results[i].stock_quantity);
            }
        }
        promptManager();
    });
}

function addInv() {
    inquirer.prompt([
        {
            name: "productID",
            type: "text",
            message: "\nEnter the product ID of the item you'd like to add inventory to:",
            validate: function validateID(productID) {
                if (isNaN(productID) || parseInt(productID) <= 0) {
                    return false || "ID must be a number greater than 0!";
                }
                return true;
            }
        },
        {
            name: "quantity",
            type: "text",
            message: "\nEnter the quantity you'd like to add to this item's inventory:",
            validate: function validateQuantity(quantity) {
                if (isNaN(quantity) || parseInt(quantity) <= 0) {
                    return false || "Quantity being added must be a number greater than 0!";
                }
                return true;
            }
        }
    ]).then(function (answers) {
        connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE product_id = ?", [parseInt(answers.quantity), answers.productID], function (error, result) {
            if (error) throw error;
            if (result.affectedRows < 1) {
                console.log("\nYou entered an invalid product ID, so the inventory could not be updated!\n");
            } else {
                console.log("\nInventory was successfully updated.\n");
            }
            promptManager();
        });
    });
}

function newProd() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "text",
            message: "\nName of the new product you're adding:",
            validate: function validateProduct(product_name) {
                if (product_name.length < 1) {
                    return false || "Please enter a product name!";
                }
                return true;
            }
        },
        {
            name: "department",
            type: "list",
            message: "\nSelect the department for this new product:",
            choices: departmentsArray
        },
        {
            name: "price",
            type: "text",
            message: "\nEnter the price for the new product (in this format: 12.99)",
            validate: function validatePrice(price) {
                if (isNaN(price) || parseFloat(price) <= 0 || price.length < 1) {
                    return false || "Price must be a number greater than 0!";
                }
                return true;
            }
        },
        {
            name: "stock_quantity",
            type: "text",
            message: "\nEnter the stock quantity for this new product:",
            validate: function validateQuantity(stock_quantity) {
                if (isNaN(stock_quantity) || parseInt(stock_quantity) < 0 || stock_quantity.length < 1) {
                    return false || "Stock quantity must be a number greater than or equal to 0!";
                }
                return true;
            }
        }
    ]).then(function (answers) {
        answers.department_id = departmentIDArray[departmentsArray.indexOf(answers.department)];
        delete answers.department;
        connection.query("INSERT INTO products SET ?", answers, function (error) {
            if (error) throw error;
            console.log("\nNew product has been successfully added!\n");
            promptManager();
        });
    });
}

function promptManager() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "\nChoose your task:\n",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function (answer) {
        if (answer.choice === "View Products for Sale") {
            displayInv();
        } else if (answer.choice === "View Low Inventory") {
            lowInv();
        } else if (answer.choice === "Add to Inventory") {
            addInv();
        } else if (answer.choice === "Add New Product") {
            connection.query("SELECT department_id, department_name FROM departments ORDER BY department_id ASC", function (error, results) {
                if (error) throw error;
                for (let i = 0; i < results.length; i++) {
                    departmentsArray.push(results[i].department_name);
                    departmentIDArray.push(results[i].department_id);
                }
                newProd();
            });

        } else {
            connection.end();
        }
    });
}

connection.connect(function (err) {
    if (err) throw err;
    promptManager();
});