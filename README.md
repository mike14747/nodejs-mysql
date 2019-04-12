# nodejs-mysql (Bamazon)

### What the project does:

* This project is an Amazon-like command line storefront... called Bamazon.

* Running 'node bamazonCustomer' from the terminal, you can check a list of available products, then sudo-shop and sudo-checkout

* Running 'node bamazonManager' from the terminal, you can check low inventory, add inventory and add new products and/or departments

* Running 'node bamazonSupervisor' from the terminal, you can


### Why the project is useful:

* This project was useful in learning advanced 'inquirer' usage... including using:
  * 'Validate' (to validate user input)
  * 'When' (to allow prompts to be included oe excluded based upon user input)

* It was also useful in learning the MySQL npm driver syntax and MySQL in general,


### How users can get started with the project:

To use this project, you'll need to do the following:

* clone this repository onto your computer

* run 'npm i' from the terminal (this will install the npm modules mysql and inquirer)

* create a mysql database using the schema in: **bamazon.sql**

* create a connection.js file in the root directory with the following contents:

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

* To find out more about the npm modules used in this project:
  * https://www.npmjs.com/package/mysql
  * https://www.npmjs.com/package/inquirer


### This project was created and is maintained by:

* Mike Gullo
* https://github.com/mike14747
* Contact me at: mike4747@oh.rr.com for more info about this project.

