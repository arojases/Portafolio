import ls from './ls.js';
import utilities from './utilities.js';

// The todoList object will hold the list of tasks
let todoList = null;

// Defining the constants, these are DOM selectors
const taskCbDOMSelector = '.task-cb';
const taskDeleteDOMSelector = '.task-delete';
const taskCounterDOMSelector = '#taskCounter';


/**
 * Todos Class
 * 
 * This class creates a list of tasks
 * To read/write operations it uses the ls module
 * The utilities module is used to facilitate DOM manipulation
 */
class Todos{

  // Instantiates the element, including listing its contents
  constructor(lsKey, elementDOM){
    this.lsKey = lsKey;
    this.element = utilities.qs(elementDOM);
    this.listTodos();
  }

  /* 
   * addTodo: calls the saveTodo function by using the task text from 
   * the text field in the page. Additionally calls the listTodos method 
   * to display the task that was added
   */
   addTodo() {
    let taskContent = utilities.qs('#newTask')
    if (taskContent.value != '') {
      saveTodo(this.lsKey, taskContent.value);
      this.listTodos();
    }
    taskContent.value = '';
  }

  /* 
   * listTodos: Displays all todos to the requested element
   * Adds all listeners and updates the tasks left counter
   */
   listTodos(){
    renderTodoList(filterList(getTodos(this.lsKey)), this.element);
    this.addCompleteListeners();
    this.addDeleteListeners();
    this.updateTasksLeft();
  }

  /**
   * completeTodo: changes the status of the task completion
   * 
   * @param {string} id identifier for the task to mark as completed
   */
  completeTodo(id) {
    toggleCompleted(this.lsKey, id);
    this.listTodos();
  }

  /**
   * deleteTodo: removes a task from the list
   * calls the deleteTask function
   * 
   * @param {string} id identifier for the task to be deleted
   */
  deleteTodo(id) {
    deleteTask(this.lsKey, id);
    this.listTodos();
  }


  /**
   * addCompleteListeners: adds listeners to the 
   * checkboxes from each task. To change the 
   * status from each tasks. Calls the completeTodo 
   * method.
   */
  addCompleteListeners() {
    let cbs = utilities.qs(taskCbDOMSelector);
    if (cbs != null) {
      // Add element to a list if is just one element
      if (cbs.length == undefined) {
        let item = cbs;
        cbs = []
        cbs.push(item);
      }
      [...cbs].forEach(element => {
      utilities.onTouch(element, () => { this.completeTodo(element.parentElement.id) });
    });
    }
  }

  /**
   * addDeleteListeners: adds listeners to the 
   * delete icons from each task. Calls the deleteTodo 
   * method.
   */
  addDeleteListeners() {
    let remove = utilities.qs(taskDeleteDOMSelector);
    if (remove != null) {
      // Add element to a list if is just one element
      if (remove.length == undefined) {
        let item = remove;
        remove = []
        remove.push(item);
      }
      [...remove].forEach(element => {
      utilities.onTouch(element, () => { this.deleteTodo(element.parentElement.id) });
    });
    }
  }

  /**
   * updateTasksLeft: counts the number of tasks
   * pending to be completed. Updates this number
   * in the view.
   */
  updateTasksLeft() {
    let count = 0
    if (todoList != null) {
       count = todoList.filter(element => { return element.completed == false }).length 
    }
    utilities.qs(taskCounterDOMSelector).innerText = count;
  }
}

/**
 * saveTodo: creates a new todo task, adds it to the list
 * and saves it to localStorage. The new task is added to
 * the beginning of the list
 * 
 * @param {string} key           localStorage object key
 * @param {string} textContent   content of the task
 */
function saveTodo(key, textContent){
  let task = {id: Date.now(), content: textContent, completed: false}
  todoList.unshift(task);
  ls.write(key, todoList);
}

/**
 * changeTask: replaces an existing task with a new one
 * saves the new version of the list to localStorage.
 * 
 * @param {string} key           localStorage object key
 * @param {string} id            identifier of the task
 * @param {object} todo          todo object to be inserted
 */
function changeTask(key, id, todo) {
  let todoList = getTodos(key);
  if (todoList != null) {
    todoList[id] = todo;
    ls.write(key, todoList);
    return true;
  }
  return false;
}

/**
 * deleteTask: removes a task from the list, updates the 
 * change to localStorage
 * 
 * @param {string} key          localStorage object key
 * @param {string} id           identifier of the task
 */
function deleteTask(key, id) {
  let todoList = getTodos(key);
  let index = todoList.findIndex(element => element.id == id);
  if (todoList != null) {
    todoList.splice(index, 1);
    ls.write(key, todoList);
    return true;
  }
  return false;
}

/**
 * getTodos: returns a lists of todos from localStorage
 * 
 * @param {string} key           localStorage object key
 */
function getTodos(key){
  if (todoList == null){
    if(ls.read(key) == null)
      todoList = [];
    else
      todoList = ls.read(key);
  }
  return todoList;
}

/**
 * renderTodoList: updates the elementDOM by appending
 * the formatted todo list.
 * 
 * @param {array} list 
 * @param {HTMLObject} elementDOM 
 */

function renderTodoList(list, elementDOM) {
  if (list !== null) {
    // Empty content of the element to start from scratch
    elementDOM.innerHTML = '';
    list.forEach((element, index) => {
      let item = document.createElement('li');
      // Add the task id as the html element id for reference
      item.id = element.id;
      item.classList.add("task");
      item.innerHTML = `
            <input type="checkbox" name="completed" class="task-cb">
            <div class="task-text" name="text">${element.content}</div>
            <i name="delete" class="fa fa-trash-o task-delete" aria-hidden="true" id=${index}></i>   
      `;
      // update the checkbox status based on the todo list status
      item.children["completed"].checked = element.completed;

      // change text class to completed to style it
      if (element.completed) {
        item.children["text"].classList.add("completed");     
      }
      elementDOM.append(item);
    });
  }
}

/**
 * toggleCompleted: toggles the value of the tasks
 * 
 * @param {string} key           localStorage object key 
 * @param {string} id            identifier of the task 
 */
function toggleCompleted(key, id) {
  
  let item = getTodos(key).find(element => element.id == id);
  if (item != null) {
      item.completed = !item.completed
      changeTask(key, id, item);
    }
}

/**
 * filterList: filters the list based on the id of the
 * object with the activeFilter class
 * 
 * @param {array} list          list of tasks to be filtered
 */
function filterList(list) {

  let filter = utilities.qs(".activeFilter").id;
  let filteredList = list;

  // Used a switch statement to leave the structure of other filters
  switch (filter) {
    case "taskCompleted":
      filteredList = list.filter(element => {
        return element.completed == true;
      });
      break;
    case "taskActive":
      filteredList = list.filter(element => {
        return element.completed == false;
      });
      break;
  }
  return filteredList;
}

export default Todos;