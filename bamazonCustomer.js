// mysql and inquirer were installed

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Chapin*32375$',
    database: 'products'
});

connection.connect(function (err) {
    console.log('Connected as id: ' + connection.threadId);
    purchase();
});

// function for selecting and ordering products from the db
var purchase = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemId',
            message: 'Please enter the item_id you would like to buy '
        },
        {
            type: 'number',
            name: 'quantity',
            message: 'How many of those will you like? ',
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmation',
            message: 'Would you like to continue shopping'
            
        }]).then(function (processing) {
        // call function that checks if there is enough stock available, if there is not console.log('Insufficient Quantity!);
            // else 
            // call function to process purchase
            // call function to update the stock
            // after update call function to show the user the total cost of the purchase
            // call function to ask if the users wants to keep shopping
    });
};

// function to check for stock availability
// function to process purchase
// function to update stock
// function to show total cost
// function to ask if user wants to keep shopping.
// Do I need a function to make the table of products display?