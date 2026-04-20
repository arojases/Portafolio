const data = "//arielrojas.github.io/final/data/rentals.json ";
fetch(data)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);

    let c1 = document.createElement('td');
    let c2 = document.createElement('td');
    let c3 = document.createElement('td');
    let c4 = document.createElement('td');


    c1.innerHTML = `$  ${jsObject.rentals.reservation[0]}`;


    document.getElementById('rental-table').appendChild(c1);


  });