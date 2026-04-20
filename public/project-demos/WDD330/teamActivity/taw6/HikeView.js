export default class HikeView {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.imgBasePath = "//byui-cit.github.io/cit261/examples/";
    }

    renderSingleHikeHTML(hike) {
        let item = document.createElement('li');
        item.innerHTML = `<h2>${hike.name}</h2>
          <div class="card"> 
          <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
                  <div>
                      <p>Distance: ${hike.distance}</p>
                      <p>Difficulty: ${hike.difficulty}</p>
                  </div>
          </div>
          </div>`;
        return item;
    }

    renderHikeList(hikeList) {
        this.containerElement.innerHTML = '';
        hikeList.forEach(hike => {
            this.containerElement.append(this.renderSingleHikeHTML(hike));
        });
    }

    renderDetailedHike(hike) {
        this.containerElement.innerHTML = '';
        let item = document.createElement('li');
        item.innerHTML = `<h2>${hike.name}</h2>
        <div class="card">  
        <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div>
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
                  <div id="backToMain"><< Return to List >></div>
          </div>
          </div>`;
        this.containerElement.append(item);
    }
}