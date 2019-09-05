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
            name: 'ItemId',
            message: 'Please enter the item_id you would like to buy '
    },
        {
            type: 'number',
            name: 'quantity',
            message: 'How many of those will you like? '
        }]).then({
        });
};
