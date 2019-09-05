-- drops the databse if already exists (I created one already in workbench, hopefully I have no issues).
DROP DATABASE IF EXISTS bamazon;

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
VALUES (1, 'wooden bat', 'sports', 10, 100);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (2, 'mitt', 'sports', 15, 75);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (3, 'gas grill', 'outdoors', 5, 400);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (4, 'dress shirt', "men's apparel", 8, 50);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (5, 'dress', "woman's apparel", 7, 70);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (6, 'bicycle', 'outdoors', 4, 90);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (7, 'lawn mower', 'garden', 2, 350);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (8, 'dress pants', "men's apparel", 8, 80);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (9, 'blouse', "women's apparel", 9, 75);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (10, 'lawn chairs', "garden", 9, 55);

SELECT * FROM products;