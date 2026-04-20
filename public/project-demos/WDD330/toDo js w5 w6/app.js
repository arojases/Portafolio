/*
 * Todos App
 * Allows the user to enter tasks for tracking purposes
 * Allows filtering by status
 * Tasks are saved to the browser's localStorage
 */

 import Todos from './Todos.js'
 import utilities from './utilities.js';
 
 // Initializes the app providing a name to save the list to and the 
 // item id to display the results
 let app = new Todos("TODO", '#taskBoard');
 let addButton = utilities.qs('#addButton');
 
 // Adds and event listener to create a new task
 utilities.onTouch(addButton, function () { app.addTodo(); });
 
 // Referencing the filters
 let filters = utilities.qs(".filter");
 
 // Attachs a listener to each label, changes the class accordingly
 [...filters].forEach(element => {
   let id = element.id;
   utilities.onTouch(utilities.qs("#" + id), (event) => {
     
     // Change the filter class, remove for all others
     filters.forEach(element => {
       if (event.target.id != element.id) {
         element.classList.remove("activeFilter");
       }
       else {
         element.classList.add("activeFilter");
       }
     });
     
     // Updates the view to display all tasks
     app.listTodos();
 
   });
 });