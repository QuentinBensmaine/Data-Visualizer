//initiate vars
let genders;
let allCountries = [];
let countries = [];
let allPets = [];
let pets = [];
let allFruits = [];
let fruits = [];
let allColors = [];
let colors = [];
let allMovies = [];
let movies = [];

//-----------------------------------------------------------------------\\

//random number (color)
let randomcolors = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};

function randomColors(size) {
    randomcolors = [];
    for (let i = 0; i < size; i++) {
        randomcolors.push('rgba(' + getRandomInt(255) + ',' + getRandomInt(255) + ',' + getRandomInt(255) + ', 0.5)');
    }
    return randomcolors;
};

//-----------------------------------------------------------------------\\

//Get API
get = function(url) {
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            all = data.people;
            //gender
            genders = [all.filter(x => x.gender == 'Male').length, all.filter(x => x.gender == 'Female').length];
            gender();
            //country
            for (let id = 0; id < all.length; id++) {
                if (allCountries.includes(all[id].contact.country) == false) {
                    allCountries.push(all[id].contact.country)
                }
            }
            for (let id = 0; id < allCountries.length; id++) {
                countries.push(all.filter(x => x.contact.country == allCountries[id]).length)
            }
            country();
            //pet
            for (let id = 0; id < all.length; id++) {
                if (allPets.includes(all[id].preferences.favorite_pet) == false) {
                    allPets.push(all[id].preferences.favorite_pet)
                }
            }
            for (let id = 0; id < allPets.length; id++) {
                pets.push(all.filter(x => x.preferences.favorite_pet == allPets[id]).length)
            }
            pet();
            //fruit
            for (let id = 0; id < all.length; id++) {
                if (allFruits.includes(all[id].preferences.favorite_fruit) == false) {
                    allFruits.push(all[id].preferences.favorite_fruit)
                }
            }
            for (let id = 0; id < allFruits.length; id++) {
                fruits.push(all.filter(x => x.preferences.favorite_fruit == allFruits[id]).length)
            }
            fruit();
            //color
            for (let id = 0; id < all.length; id++) {
                if (allColors.includes(all[id].preferences.favorite_color) == false) {
                    allColors.push(all[id].preferences.favorite_color)
                }
            }
            for (let id = 0; id < allColors.length; id++) {
                colors.push(all.filter(x => x.preferences.favorite_color == allColors[id]).length)
            }
            color();
        });
};
get('https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7');

//------------------------------------------------------------------------------\\

//gender chart
gender = function() {
    var gender = document.getElementById('gender');
    var myPie = new Chart(gender, {
        type: 'pie',
        data: {
            labels: ['Female', 'Male'],
            datasets: [{
                label: '# of Votes',
                data: genders,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        }
    });
}

//pet chart
pet = function() {
    randomColors(pets.length)
    console.log(pets)
    console.log(allPets)
    var pet = document.getElementById('pet');
    var myChart = new Chart(pet, {
        type: 'bar',
        data: {
            labels: allPets,
            datasets: [{
                label: '# of Votes',
                data: pets,
                backgroundColor: randomcolors,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

//country chart
country = function() {
    randomColors(countries.length)
    console.log(countries)
    console.log(allCountries)
    var country = document.getElementById('country');
    var myChart = new Chart(country, {
        type: 'pie',
        data: {
            labels: allCountries,
            datasets: [{
                label: '# of Votes',
                data: countries,
                backgroundColor: randomcolors,
                borderWidth: 1
            }]
        }
    });
}

//fruit chart
fruit = function() {
    randomColors(fruits.length)
    var fruit = document.getElementById('fruit');
    var myChart = new Chart(fruit, {
        type: 'polarArea',
        data: {
            labels: allFruits,
            datasets: [{
                label: '# of Votes',
                data: fruits,
                backgroundColor: randomcolors,
                borderWidth: 1
            }]
        }
    });
}

//color chart
color = function() {
    randomColors(colors.length)
    var color = document.getElementById('color');
    var myChart = new Chart(color, {
        type: 'doughnut',
        data: {
            labels: allColors,
            datasets: [{
                label: '# of Votes',
                data: colors,
                backgroundColor: randomcolors,
                borderWidth: 1
            }]
        }
    });
}