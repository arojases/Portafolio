/**
 * LS: module for browser localStorage manipulation
 */

 const ls = {
    // reads an item from localStorage and parses as JSON
    read: (key) => {
       return JSON.parse(localStorage.getItem(key));
    },
    // uses a JSON object to written as a string to localStorage
    write: (key, data) => {
       localStorage.setItem(key, JSON.stringify(data));
    }
  }
  export default ls;