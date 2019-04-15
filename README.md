# nodejs-mysql (Bamazon)


### What the project does:

* This project is an Amazon-like command line storefront using nodeJS... called Bamazon.

* Running 'node bamazonCustomer.js' from the terminal, a customer can:
  * check a list of available products
  * sudo-shop
  * sudo-checkout

* Running 'node bamazonManager.js' from the terminal, the manager can:
  * check low inventory
  * add inventory
  * add new products and/or departments

* Running 'node bamazonSupervisor.js' from the terminal, the supervisor can:
  * view Product Sales by Department
  * create new Departments

---

### Why the project is useful:

* Learning the basics of shopping, checkout and inventory systems of an e-commerce storefront.
* This project was useful in further learning 'inquirer' usage... including:
  * 'Validate' (to validate user input)
* It was also useful in learning the MySQL and the npm MySQL driver.

---

### How users can get started with the project:

To use this project, you'll need to do the following:

* clone this repository onto your computer

* run 'npm i' from the terminal (this will install the npm modules mysql, inquirer and cli-tables)

* create a mysql database using the schema in: **bamazon.sql**

* create a connection.js file with the following contents:

```
var mysql = require("mysql");

var connection = mysql.createConnection({
    database: "bamazon",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "your_mysql_password"
});

module.exports = connection;
```

---

### More Info about this project:

* The cli-table npm module was an easy way of creating nice looking tables with colored column headings in the command terminal
  * It's easy to use... here's a code snippet demonstrating its use:

```
// these 2 lines should be near the top of your js file
var Table = require('cli-table');
var table = {};

// create the header when you're ready to start making the table
table = new Table({
    head: ['Order QTY', 'Item', 'Each Price', 'Total Cost'],
    colAligns: ['middle', 'left', 'right', 'right']
});

// populate the table when you're ready to add data to the table array
table.push(
    [answers.quantity, result[0].product_name, '$' + result[0].price, '$' + (result[0].price * answers.quantity).toFixed(2)]
);

// display the table in the terminal
console.log("\n\n" + table.toString());
```


* To find out more about the npm modules used in this project:
  * https://www.npmjs.com/package/mysql
  * https://www.npmjs.com/package/inquirer
  * https://www.npmjs.com/package/cli-table

---

### Detailed flow chart of this project's js files:
&nbsp;
> **node bamazonCustomer.js**

Displays all products where stock_quantity > 0.

Prompts the customer to enter a product ID of the item they'd like to purchase.

Validates the customer input to make sure:
  * The input is a number greater than 0.
  * The input is a valid product ID in the database.

Prompts the customer to enter a quantity of this item to purchase.

Validates the customer input to make sure:
  * The input is a number greater than 0.
  * Checks the current stock_quantity to see if the order can be fulfilled.

If the order can be fulfilled, the order is processed, the invoice is displayed and the following occurs:
  * The stock_quantity in the products table for this product is reduced by the number the customer just purchased.
  * Product_sales in the products table for this product is adjusted to reflect the invoice total of this purchase.

If there’s not enough stock to fulfill the order:
  * A message is displayed informing the customer of this.
  * The current stock_quantity is displayed.
  * The customer is sent back to being prompted to enter a product ID of what they’d like to purchase.

After the purchase, the customer is prompted to buy another product (if they select Yes) or exit (if they select No).
&nbsp;
&nbsp;
> **node bamazonManager.js**

The manager is prompted to perform one of the following tasks:
  * View all products for sale.
  * View products with low inventory (products with less than 20 stock_quantity).
  * Add to a product’s inventory.
  * Add a new product.
  * Exit

View Products for Sale… this is the same as the bamazonCustomer.js file except:
  * All products (even those with 0 stock_quantity) are displayed.
  * There is an additional column to show stock_quantity.

View Low Inventory:
  * This is the same as above except is only shows products whose stock_quantity is less than 20.

Add to Inventory:
  * The manager is prompted to enter the product ID of the item they’d like to add quantity to.
  * The manager is prompted to enter a number they’d like to add to the current stock_quantity.
  * Both inputs are checked for validity:
    * Both are checked to make sure they are numbers greater than 0.
    * The product ID is checked to make sure it matches a real product_id in the products table.
  * If both inputs are valid, the stock_quantity is adjusted based upon the manager’s input.

Add New Product:
  * The manager is prompted to enter the name of the new product.
    * The input is validated to make sure it included at least one character.
  * A list of available departments is displayed for the manager to select from.
  * The manager is prompted to enter a price for the new item.
    * The input is validated to make sure it’s a number greater than 0.
  * The manager is prompted to enter a stock_quantity for the new item.
    * The input is validated to make sure it’s a number greater than 0.
  * The new product is added… including the department_id… which is based upon the selection from the second prompt; the product_sales column is initialized at 0.
    
As any of the above tasks are completed, the manager is sent back to the original prompt… asking them to select a task.
&nbsp;
&nbsp;
> **node bamazonSupervisor.js**

The supervisor is prompted to perform one of the following tasks:
  * View product sales by department
  * Create a new department
  * Exit

View Product Sales by Department:
  * The following information will be displayed from the products and departments tables in the database (grouped and ordered by department_id… using aggregate functions):
    * department_id
    * department_name
    * over_head_costs (of each department)
    * product_sales (as a sum of all items in that department)
    * total_profit (as a derived column using the above pair of results)

Create a New Department:
  * The supervisor is prompted to enter a new department name.
    * The input is validated to make sure it included at least one character.
  * The supervisor is prompted to enter the over_head_costs for this new department.
    * This input can be left blank and will default to 0 if it is.
    * If the over_head_costs field is not left blank, it’s checked to make sure it’s a number greater than 0.
  * The new department is added to the database using at INSERT statement.

As any of the tasks are completed, the supervisor is returned to the above prompt to select a task.

---

### This project was created and is maintained by:

* Mike Gullo
* https://github.com/mike14747
* Contact me at: mike4747@oh.rr.com for more info about this project.