//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import { makeRequest, posts } from "./main.js";
export class Auth {
  constructor() {
    this.jwtToken = '';
    this.user = {};
  }

  async login(callback) {
    event.preventDefault();
    // replace the ids below with whatever you used in your form.
    const password = document.getElementById('password');
    const username = document.getElementById('username');
    const postData = {
      email: username.value,
      password: password.value  
    };
    try {
        let token = await makeRequest('login', 'POST', {
        email: username.value,
        password: password.value})
        
console.log(token.accessToken)
        
      // 2. if we get a successful response...we have a token!  Store it since we will need to send it with every request to the API.
      
      // let's get the user details as well and store them locally in the class
      // you can pass a query to the API by appending it on the end of the url like this: 'users?email=' + email
      this.jwtToken = token.accessToken;
        
      // hide the login form.
      document.getElementById('login').classList.add('hidden');
      // clear the password
      password.value = '';
      
      let postData = await makeRequest('posts', 'GET', {
        email: username.value,
        password: password.value},
        this.jwtToken)
        console.log(postData)
        posts(postData, username)

      // since we have a token let's go grab some data from the API by executing the callback if one was passed in
      if(callback) {

      }
    } catch (error) {
      // if there were any errors display them
      console.log(error);
    }
  }
  
  // uses the email of the currently logged in user to pull up the full user details for that user from the database
  async getCurrentUser(email) {
    try {
      // 3. add the code here to make a request for the user identified by email...don't forget to send the token!
    } catch (error) {
      // if there were any errors display them
      console.log(error);
    }
  }
  
  set token(value) {
    // we need this for the getter to work...but we don't want to allow setting the token through this.
  }
  get token() {
    return this.jwtToken;
  }
} // end auth class


