// mysql and inquirer were installed

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'products'
});

connection.connect(function (err) {
    console.log('Connected as id: ' + connection.threadId);

    // console.log('Welcome to bamazon! \n Would you like to browse the selection and choose something to buy?');

    // // displaying the products table
    // displayTable();

    // calling purchase function
    purchase();
    // start();
});

// function asking if user wants to see the catalog and shop
// var start = function () {
//     inquirer.prompt([
//         {
//             type: 'confirm',
//             name: 'shopping',
//             message: 'Welcome to bamazon! \n Would you like to browse the selection and choose something to buy?'
//         }]
//     );
//     if (shopping){
//         purchase();
//     } else {
//         console.log('= = = = = = = = = = G O O D  B Y E! = = = = = = = = = =')
//     }
// };

// function for selecting and ordering products from the db
var purchase = function () {

    // displaying the products table
    // displayTable();
    // user being asked to choose item id and qty
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
        }
        // {
        //     type: 'confirm',
        //     name: 'confirmation',
        //     message: 'Would you like to continue shopping'

        // }
    ]).then(function (processing) {
        // checking if there is enough stock to fulfill order;
        if (processing.quantity > stock_quantity) {
            console.log('Unfortunately we do not have enough stock to fulfill your request =(');
        } else {
            // update table and process purchase
            updateStock();
            totalPurchase();
        };

        // call function to update the stock
        // after update call function to show the user the total cost of the purchase
        // call function to ask if the users wants to keep shopping
    });
};

// // function to print table
// function displayTable() {
//     connection.query('SELECT * FROM products', function (err, res) {
//         if (err) throw err;
//         console.table(res);
//         connection.end();
//     });
// };

// function to update stock
function updateStock() {
    // declaring a variable to pass the value of of the connection request and its parameters
    var query = connection.query(
        // columns and rows to update 
        'UPDATE products SET ? WHERE?',
        [
            {
                stock_quantity: stock_quantity - quantity
            },
            {
                product_name: itemId,
            }
        ],
        // this function will throw an error or display the affected rows
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + 'Processing Order!');
        }
    );
    // query requesting data or information from a database table or combination of tables.
    console.log(query.sql);
};
// function to show total cost, mostly place holders for now
function totalPurchase() {
    var amountToPay = processing.quantity * price;
    console.log('Your total for this transaction is $' + amountToPay);
};
// function to ask if user wants to keep shopping.
