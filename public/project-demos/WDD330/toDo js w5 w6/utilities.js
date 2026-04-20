/**
 * Utilities: module to make it easier to manipulate DOM
 * 
 */

 const utilities = {
    // Uses a query selector to return a DOM element
    qs: (elementDOM) => {
      let query  = document.querySelectorAll(elementDOM)
      return query.length > 1 ? query : query[0];
    },
  
    // Attaches a listener to an element
    onTouch: (element, fallback) => {
      if (element.ontouchend === undefined){
        element.addEventListener('click', fallback);
      }
      else{
        element.addEventListener('touchend', fallback);
      }
    }
  }
  
  export default utilities;