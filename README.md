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


### Why the project is useful:

* Learning the basics of shopping, checkout and inventory systems of an e-commerce storefront.
* This project was useful in further learning 'inquirer' usage... including:
  * 'Validate' (to validate user input)
* It was also useful in learning the MySQL and the npm MySQL driver.


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


### This project was created and is maintained by:

* Mike Gullo
* https://github.com/mike14747
* Contact me at: mike4747@oh.rr.com for more info about this project.

