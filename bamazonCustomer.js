// mysql and inquirer were installed

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect(function (err) {
    console.log('Connected as id: ' + connection.threadId);
    console.log('');

    start();
});

// function asking if user wants to see the catalog and shop
var start = function () {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'shopping',
            message: '                + + + + + +  WELCOME TO BAMAZON! + + + + + + \n\n Would you like to browse the selection and choose something to buy?'
        }]
    ).then(function (bridge) {
        if (bridge.shopping) {
            displayTable();
            // purchase();
        } else {
            console.log('= = = = = = = = = = G O O D  B Y E! = = = = = = = = = =')
            connection.end();
            return;

        };
    })
};

// function for selecting and ordering products from the db
var purchase = function () {

    // displaying the products table
    // user being asked to choose item id and qty
    inquirer.prompt([
        {
            type: 'input',
            name: 'itemId',
            message: 'Please enter the item_id of the product you would like to buy today '
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
        }

    ]).then(function (processing) {
        // passing the value of stock_quantity to varible stock
        var stock = 'SELECT stock_quantity, price FROM products WHERE ?';
        var stockUpdate = 'UPDATE products SET stock_quantity = ? WHERE ?';

        var remainingStock;
        connection.query(stock, { item_id: processing.itemId }, function (err, res) {
            // console.log('stock qty', res[0].stock_quantity);
            remainingStock = res[0].stock_quantity - processing.quantity;
            // console.log('remaining', remainingStock);
            if (processing.quantity > res[0].stock_quantity || processing.quantity > res[0].stock_quantity=== 0){
                console.log('We apologize, we do not have enough stock at the moment to fulfill your request :(');
                connection.end();
                return;
            }else if (err) throw err;
            // console.log('price', res[0].price);
            // console.log('proc qty', processing.quantity);
            var amountToPay = parseFloat(res[0].price) * parseFloat(processing.quantity);
            console.log('');
            console.log('==================================================');
            console.log('The number of items you ordered is ' + processing.quantity);
            console.log('Your total for this transaction is $' + amountToPay);
            console.log("Thank you for shopping with us today, we appreciate your business! =)");
            console.log('==================================================');
            console.log('');
            connection.query(stockUpdate, [remainingStock, {item_id: processing.itemId}], function (err, res) {
                if (err) throw err;
                // console.log('res ', res);
                console.log('');
                // console.log('**********************************************');
                // console.log('THIS IS THE UPDATED TABLE');
                // displayTable();
                goAgain();
            });
        })
    });
};
// // function to print table
function displayTable() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('\n\n');
        console.table(res);
        console.log('');
        purchase();
    });
};

// function asking if user wants another transaction
// variable named changed from reStart to goAgain b/c the 're' part was italic
var goAgain = function () {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'shopagain',
            message: 'Would you like to take a look at something else?'
        }]
    ).then(function (bridgeTwo) {
        if (bridgeTwo.shopagain) {
            displayTable();
        } else {
            console.log('\n');
            console.log('= = = = = = = = = = G O O D  B Y E! = = = = = = = = = =')
            connection.end();
            return;

        }
    })
};