const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        let s_towns = towns.filter(filterByName);

        function filterByName(item) {
            if (item.name == "Preston" || item.name == "Fish Haven" || item.name == "Soda Springs") {
                return true;
            }
        };

        for (let i = 0; i < s_towns.length; i++) {

            let card = document.createElement('section');
            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            let h4 = document.createElement('h4');
            let year = document.createElement('p');
            let population = document.createElement('p');
            let rainfall = document.createElement('p');
            let image = document.createElement('img');


            h3.textContent = s_towns[i].name;
            h4.textContent = s_towns[i].motto;
            year.textContent = "Year Founded: " + s_towns[i].yearFounded;
            population.textContent = "Population: " + s_towns[i].currentPopulation;
            rainfall.textContent = "Average Rainfall: " + s_towns[i].averageRainfall;
            image.setAttribute('src', "img/" + s_towns[i].photo);
            image.setAttribute('alt', h3.textContent + " - " + s_towns[i].order);

            div.append(h3, h4, year, population, rainfall);
            card.append(div, image);

            document.querySelector('div.cards').appendChild(card);

        }

    });