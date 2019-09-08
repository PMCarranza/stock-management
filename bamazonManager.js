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
        };// else if (managerTask.task === 'View low Inventory'){
            // lowInventory();
        // } else if (managerTask.task === 'Add to Inventory') {
        //     addInventory();
        // } else {
        //     newProduct();
        // }
        // connection.end();
        // return;
    });
};




function forSale() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('\n\n');
        console.log('             ========== THESE ARE THE PRODUCTS FOR SALE  ==========')
        console.table(res);
        console.log('\n');
        connection.end();
        return;
    });
};
