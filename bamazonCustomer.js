"use strict";

var inquirer = require("inquirer");

inquirer.prompt([
    {
        name: "productID",
        message: "\n\nEnter the ID of the product you'd like to buy: ",
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
    console.log("You entered ID: " + answers.productID + " and a quantity of: " + answers.quantity);
});