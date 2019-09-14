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
    // console.log('Connected as id: ' + connection.threadId);
    start();
});

var start = function () {
    inquirer.prompt([{
        type: 'list',
        name: 'task',
        message: 'What do you need to do?',
        choices: ['View Products for Sale', 'View low Inventory', 'Add to Inventory', 'Add new product']
    }]).then(function (managerTask) {
        // console.log('choice was --> ', managerTask.task);
        if (managerTask.task === 'View Products for Sale') {
            forSale();
        } else if (managerTask.task === 'View low Inventory') {
            lowInventory();
        } else if (managerTask.task === 'Add to Inventory') {
            addInventory();
        } else {
            newProduct();
        }
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
        console.log('\n');
        whatElse();
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
        whatElse();
    });
};

// function to add/update the inventory quantity

function addInventory() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'productName',
            message: 'Which product do you need to update?',
            validate: function (value) {
                if (isNaN(value)) {
                    return true;
                } else {
                    console.log('\n');
                    console.log('Please use the product name, not numbers, Thanks!');
                    console.log('\n');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'stockQty',
            message: 'What is the new stock quantity'
        }
    ]).then(function (updating) {
        var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updating.stockQty
                },
                {
                    product_name: updating.productName
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log('\n');
                // console.log('error--> ', err);
                console.log('===============  YOU HAVE UPDATED THE FOLLOWING ===============');
                // console.table(res);
                console.log('\n');
                // console.log('res --> ', res);
                console.log('You updated the column for: ' + updating.productName + '\n' + 'The new quantity is: ' + updating.stockQty);
                console.log('\n');
                whatElse();
            }
        );
        // logs the actual query being run
        // console.log('query--> ', query.sql);
    })
};

function newProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newProdName',
            message: 'What is the new product name: '
        },
        {
            type: 'input',
            name: 'newDept',
            message: 'To what department does this belong?: '
        },
        {
            type: 'decimal',
            name: 'newProdPrice',
            message: 'What is the selling price?: '
        },
        {
            name: 'input',
            name: 'newProdQty',
            message: 'How many are there available?: '
        }

    ]).then(function (addNew) {
        var query = connection.query(
            'INSERT INTO products SET ?',
            [
                {
                    product_name: addNew.newProdName,
                    department_name: addNew.newDept,
                    price: addNew.newProdPrice,
                    stock_quantity: addNew.newProdQty
                }
            ],
            function (err, res) {
                if (err) throw err;
                // console.table(res);
                console.log('\n');
                // console.log('res --> ', res);
                console.log('You updated the column for: ' + addNew.newProdName + '\n' + 'The new quantity is: ' + addNew.newProdQty);
                console.log('The deparment affected is : ' + addNew.newDept + '\n' + 'The price for the new product is: ' + addNew.newProdPrice);
                console.log('\n');
                whatElse();
            }
        );
    });
};

whatElse = function () {
    inquirer.prompt([{
        type: 'confirm',
        name: 'action',
        message: 'Is there anything else you need to do?'
    }]
    ).then(function (taskToDo) {
        if (taskToDo.action) {
            start();
        } else {
            console.log('\n');
            console.log('= = = = = = = = = = KEEP UP THE GOOD WORK! = = = = = = = = = =');
            console.log('\n');
            connection.end();
        }
    })
};


console.log('\n');
                    console.log('Please use the product name to update it, thanks');
                    console.log('\n');