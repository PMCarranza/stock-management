# **Stock Management**

# **Description**
This is a back-end application that simulates amazon.com in a very small scale.  The app will take in orders from customers and deplete stock from the store's inventory.  the app serves two purposes so far, the first is to fullfill customers request for the purchase of x item and allows a manager to updated the inventory.

## **User = Customer**

The app takes in orders from customers and depletes stock from the store's inventory.
The following gif, shows the user responding to prompts for selecting the item to buy and the quantity desired; once those inputs are captured, the app displays the amount to pay and asks the user if they wish to continue; if the answer is yes, the app displays the updated table of products and the prompt to choose an item; if the answer is no, the app ends with a "good bye" message.

 <img src="assets/customer.gif">

 ## **User = Manager**

  Built in a similar fashion as the "Customer" app, this app takes input from the user (in this case the store Manager), and allows the user to view the products for sale, view the products with low stock quantity, update the quantity of existing products or add new products.
  After each task the user is prompt to answer if another task is required and the app either executes the chosen task or quits with a "good bye" message.
  The following gif shows the user choosing to see the inventory and the products with quantities under 5 items.

  <img src="assets/showSaleAndLow.gif">

    The following gif shows the user updating the inventory.

 <img src="assets/updateQty.gif">

  The following gif shows the user adding a new product.
  <img src="assets/addingProduct.gif">
  
  ## **Technologies**
  •  Javascript
  •  Node.js
  •  Express.js
  •  Inquirer
  •  MySql
  •  Workbench
  
  ## **Roadmap**
  I wish to add a front-end to what already exists so I can make an actual store, I am not planning for this app to compete with amazon but I think this framework could be use by smaller businesses with limited inventory of items to get started in the online retail world.
  
  ## **Contributors**
  
At this point in time I am the only one contributing to this app, if you have any suggestions, ideas or feedback; feel free to contact me at marino.carranza@gmail.com.
  
  ## **Acknowledgments**
I would like to thank Catherine Pham, Trae Shanks and Arron Linton for their input and guindance, and to you for taking the time to take a look at my app.

  Mariño Carranza.
  

