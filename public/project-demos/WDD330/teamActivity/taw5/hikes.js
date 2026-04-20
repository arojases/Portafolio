class hike {
    constructor(name, distance, difficulty, description, directions) {
        this.name = name;
        this.imgSrc = "falls.jpg";
        this.imgAlt = "Image of Bechler Falls";
        this.distance = distance;
        this.difficulty = difficulty;
        this.description = description;
        this.directions = directions;
    }
}

const bechlerFalls = new hike("Bechler Falls", "3 miles", "Easy",
    "Beautiful short hike along the Bechler river to Bechler Falls", "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.")

const tetonCanyon = new hike("Teton Canyon", "3 miles", "Easy", "Beautiful short (or long) hike through Teton Canyon.", "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.")

const denandaFalls = new hike("Denanda Falls", "7 miles", "Moderate", "Beautiful hike through Bechler meadows river to Denanda Falls", "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.")

const hikeList = [bechlerFalls, tetonCanyon, denandaFalls];
console.log(hikeList);

const imgBasePath = "//byui-cit.github.io/cit261/examples/";

export default class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
        this.backButton = this.buildBackButton();
    }
    // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
    getAllHikes() {
        return hikeList;
    }
    // For the first stretch we will need to get just one hike.
    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }
    //show a list of hikes in the parentElement
    showHikeList() {

        const hikeListElement = document.getElementById("hikes");
        hikeListElement.innerHTML = "";
        renderHikeList(hikeList, hikeListElement);

    }
    // show one hike with full details in the parentElement
    showOneHike(hikeName) {
        console.log(hikeName);
        renderOneHikeFull(elem);
    }
    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
    addHikeListener() {
        // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.

        /*const links = Array.from(document.querySelectorAll('li'));
        console.log(links);
        const de = links.map(link => link.textContent);
        console.log(de[0]);
        links.forEach(hike =>
            hike.addEventListener("click", this.showHikeList(hike.name)));
    */
        var lists = document.getElementsByClassName('hikeStyles');
        console.log(lists[1]);
        for (var i = 0; i < lists.length; i++) {

            var children = lists[i].addEventListener('click', clickHandler);

        }
        this.showOneHike(children);

        function clickHandler(e) {
            var elem, evt = e ? e : event;
            if (evt.srcElement) {
                elem = evt.srcElement;
            } else if (evt.target) {
                elem = evt.target;
            }

            // Filter out li tags
            if (elem && ('LI' !== elem.tagName.toUpperCase())) {
                return true;
            }

            return true;
        }

    }
    buildBackButton() {
        const backButton = document.createElement("button");

        return backButton;
    }
}

// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHikeLight(hike));
    });
    renderOneHikeLight(hike);
}

function renderOneHikeLight(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div class="information">
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
  </div>`;
    return item;
}

function renderOneHikeFull(hike) {


    elem.innerHTML = ` <h2>${hike.name}</h2>
  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
  <div class="information">
          <div>
              <h3>Distance</h3>
              <p>${hike.distance}</p>
          </div>
          <div>
              <h3>Difficulty</h3>
              <p>${hike.difficulty}</p>
          </div>
          <div>
              <h3>Description</h3>
              <p>${hike.description}</p>
          </div>
          <div>
              <h3>Direction</h3>
              <p>${hike.directions}</p>
          </div>
  </div>`;
    return item;
}




/*
original code
//create an array of hikes
const hikeList = [
    {
        name: "Bechler Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description:
            "Beautiful short hike along the Bechler river to Bechler Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
        name: "Teton Canyon",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "3 miles",
        difficulty: "Easy",
        description: "Beautiful short (or long) hike through Teton Canyon.",
        directions:
            "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
        name: "Denanda Falls",
        imgSrc: "falls.jpg",
        imgAlt: "Image of Bechler Falls",
        distance: "7 miles",
        difficulty: "Moderate",
        description:
            "Beautiful hike through Bechler meadows river to Denanda Falls",
        directions:
            "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];
function showHikeList() {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}
 
function renderHikeList(hikes, parent) {
  hikes.forEach(hike => {
    parent.appendChild(renderOneHike(hike));
  });
}
function renderOneHike(hike) {
  const item = document.createElement("li");
 
  item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>`;
 
  return item;
}
*/