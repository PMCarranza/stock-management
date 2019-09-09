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

    start();
});

var start = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'task',
        message: 'What do you need to do?',
        choices: ['View Products for Sale', 'View low Inventory', 'Add to Inventory', 'Add new product']
    }]).then(function (managerTask) {
        console.log('choice was --> ', managerTask.task);
        if (managerTask.task === 'View Products for Sale') {
            forSale();
        } else if (managerTask.task === 'View low Inventory') {
            lowInventory();
        } else if (managerTask.task === 'Add to Inventory') {
            addInventory();
            // console.log('===============  YOU HAVE UPDATED THE STOCK ===============');
        } else {
            console.log('\n');
            console.log('===============  Add products to the inventory  ===============');
            // newProduct();
        }
        // connection.end();
        // return;
    });
};

// function to display the table with the items for sale, this is the same table shown to the user
function forSale() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('\n\n');
        console.log('               ========== THESE ARE THE PRODUCTS FOR SALE  ==========')
        console.table(res);
        console.log('\n');
    });
};

// function to display the items with a stock quantity under 5
function lowInventory() {
    // The products where the stock_quantity is lower than 5 need to be pulled from the DB and then those rows need to be displayed to the user
    var stock = 'SELECT * FROM products WHERE stock_quantity < 5';
    connection.query(stock, function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.log('   ==========  THESE ITEMS HAVE LOW QUANTITIES LEFT IN INVENTORY  ==========');
        console.table(res);
        console.log('\n');

    });
};

function addInventory() {
    // an iquirer prompt is needed to have the users add to the quantities of the already existing products
    // use UPDATE to pass the input into the DB
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'What product needs updating?'
        },
        {
            type: 'number',
            name: 'stockQuantity',
            message: 'What is the new quantity?'
            // validate: function (value) {
            //     if (isNaN(value) === false) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
        }
    ]).then(function (updating) {
        var stock = 'UPDATE products SET stock_quantity ? WHERE ?';

        connection.query(stock, { stock_quantity: updating.stockQuantity }, function (err, res) {
            console.log('err--> ', err);
            // console.log('new stock# --> ', stockUpdate);
            // console.log('query--> ', query);
            console.log('res--> ', res);
            // newStockQty = res;
            // console.log('newStockQty --> ', newStockQty);
            if (err) throw err;
            console.log('err--> ', err);
            // console.log(res.affectedRows + " products updated!\n");
        }
        [
            {
                stock_quantity: updating.stock_quantity
            },
            {
                product_name: updating.product_name
            }
        ]
        );
        // logs the actual query being run
        // console.log(query.sql);
    })
};

// console.log('first stock# --> ', stock);
// console.log('first new stock# --> ', stockUpdate);