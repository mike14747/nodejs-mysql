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
    PRIMARY KEY (product_id)
);

-- create departments table
CREATE TABLE departments (
    department_id INT(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(8,2),
    PRIMARY KEY (department_id)
);

-- inserts for apparel
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
('Blue Nike T-Shirt', 1, 19.99, 38),
('Red Nike T-Shirt', 1, 19.99, 56),
('Levi Jeans', 1, 29.99, 34),
('Columbia Convertible Pants', 1, 49.97, 19),
('Paisley Socks', 1, 5.99, 19);

-- inserts for electronics
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
('Surround Sound Receiver', 2, 369.99, 13),
('42-inch TV', 2, 269.99, 22),
('10-inch Powered Sub-Woofer', 2, 142.99, 41),
('BluRay Player', 2, 99.99, 54),
('Digital Camera', 2, 284.99, 27);

-- inserts for food
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
('Almonds (12oz)', 3, 5.69, 65),
('Coconut Water', 3, 1.99, 212),
('Lentil Soup', 3, 1.99, 123),
('Garbanzo Beans', 3, 1.29, 156),
('Brown Rice Pasta', 3, 2.49, 178);

-- inserts for computer
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
('27-inch Monitor', 4, 199.99, 12),
('600 watt Power Supply', 4, 99.99, 45),
('250GB SSD', 4, 79.99, 158),
('3TB Hard Drive', 4, 99.99, 17),
('8GB (2 x 4GB) DDR4 Memory', 4, 59.99, 66);

-- inserts for toiletries
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES
('Toilet Paper', 5, 1.99, 85),
('Shampoo', 5, 3.99, 67),
('Conditioner', 5, 4.99, 48),
('Bar Soap', 5, 0.59, 243),
('Toothpaste', 5, 1.99, 112);

-- inserts for departments
INSERT INTO departments (department_name, over_head_costs) VALUES
('Apparel', 2550.75),
('Electronics', 14567.32),
('Food', 1875.11),
('Computer', 3459.43),
('Toiletries', 912.86);