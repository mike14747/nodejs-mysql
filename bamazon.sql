-- create and use new table
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

-- create products table
CREATE TABLE products (
    product_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_id INT(10),
    price DECIMAL(8,2) NOT NULL,
    stock_quantity INT(10) DEFAULT 0,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (product_id)
);

-- create departments table
CREATE TABLE departments (
    department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(8,2) DEFAULT 0,
    PRIMARY KEY (department_id)
);

-- inserts for apparel
INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales) VALUES
('Nike T-Shirt (Blue)', 1, 19.99, 38, 1559.22),
('Nike T-Shirt (Red)', 1, 19.99, 56, 779.61),
('Levi Jeans', 1, 29.99, 34, 389.87),
('Columbia Convertible Pants', 1, 49.97, 19, 549.67),
('Paisley Socks', 1, 5.99, 19, 29.95);

-- inserts for electronics
INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales) VALUES
('Surround Sound Receiver', 2, 369.99, 13, 1479.96),
('42-inch TV', 2, 269.99, 22, 23489.13),
('10-inch Powered Sub-Woofer', 2, 142.99, 41, 1715.88),
('BluRay Player', 2, 99.99, 54, 199.98),
('Digital Camera', 2, 284.99, 27, 854.97);

-- inserts for food
INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales) VALUES
('Almonds (12oz)', 3, 5.69, 65, 62.59),
('Coconut Water', 3, 1.99, 212, 288.55),
('Lentil Soup', 3, 1.99, 123, 27.86),
('Garbanzo Beans', 3, 1.29, 156, 7.74),
('Brown Rice Pasta', 3, 2.49, 178, 9.96);

-- inserts for computer
INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales) VALUES
('27-inch Monitor', 4, 199.99, 12, 12999.35),
('600 watt Power Supply', 4, 99.99, 45, 99.99),
('250GB SSD', 4, 79.99, 158, 6239.22),
('3TB Hard Drive', 4, 99.99, 17, 1399.86),
('8GB (2 x 4GB) DDR4 Memory', 4, 59.99, 66, 359.94);

-- inserts for toiletries
INSERT INTO products (product_name, department_id, price, stock_quantity, product_sales) VALUES
('Toilet Paper', 5, 1.99, 85, 240.79),
('Shampoo', 5, 3.99, 67, 111.72),
('Conditioner', 5, 4.99, 48, 144.71),
('Bar Soap', 5, 0.59, 243, 189.39),
('Toothpaste', 5, 1.99, 112, 41.79);

-- inserts for departments
INSERT INTO departments (department_name, over_head_costs) VALUES
('Apparel', 2550.75),
('Electronics', 19567.32),
('Food', 1275.11),
('Computer', 13459.43),
('Toiletries', 912.86);

SELECT * FROM products;