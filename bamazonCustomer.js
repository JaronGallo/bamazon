var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  connection.end();
});

connection.query("SELECT * FROM products", function(err, results) {
	for (var i = 0; i < results.length; i++) {
		console.log("");
		console.log("Product Id: " + results[i].item_id);
		console.log("Product Name: " + results[i].product_name);
		console.log("Price: " + results[i].price);
		console.log("========================");
	}
  inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What is the name of the product you would like to buy?"
    },
    {
    name: "units",
    type: "input",
    message: "How many units of the product would you like to buy?"
    }]).then(function(answer) {
      var chosenId, check;
      for (var i = 0; i < results.length; i++) {
          if(results[i].product_name===answer.item){
          chosenId = results[i];
          check = true;
          
         }
       }
       console.log(chosenId.item_id);
       if (check===true){
                connection.query('UPDATE products SET ? WHERE ?',
                [
                {
                stock_quantity: answer.units
                },
                {
                item_id: chosenId.item_id
                }
                ///not sure why this didnt work..
                ],function(error) {
              if (error) throw err;
            }); 
          }
        });
  });
//From here I would make it so it would take the amount 
//that the user said would be taken away from the database.

  

