-- drops the databse if already exists (I created one already in workbench, hopefully I have no issues).
-- DROP DATABASE IF EXISTS bamazon;

-- creates the database products
CREATE DATABASE bamazon;

-- assigning the db to the work
USE bamazon;

-- creates the table for the products in the bamazon db
CREATE TABLE products(
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(10) NOT NULL,
    stock_quantity(10) NOT NULL,
    PRIMARY KEY(item_id)
);

-- populating the 'database' with products

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'wooden bat', 'sports', 45.50, 10);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (2, 'mitt', 'sports', 70.00, 15);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (3, 'gas grill', 'outdoors', 425.75, 5);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (4, 'dress shirt', "men's apparel", 39.99, 8);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (5, 'dress', "woman's apparel", 72.25, 9);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (6, 'bicycle', 'outdoors', 103.25, 7);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (7, 'lawn mower', 'garden', 315.00, 4);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (8, 'dress pants', "men's apparel", 24.75, 6);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (9, 'blouse', "women's apparel", 59.99, 12);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (10, 'lawn chairs', "garden", 49.25, 8);

SELECT * FROM products;