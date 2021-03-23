//Initiate vars
let all;
let tabledata;
let table;

//-----------------------------------------------------------------------\\

//Get API
get = function(url) {
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            all = data.people;
            let newtable = [];
            for (let id = 0; id < all.length; id++) {
                let pos = all[id].contact.location.lon.toString() + " - " + +all[id].contact.location.lat.toString();
                newtable.push({ id: all[id].id, firstname: all[id].firstname, lastname: all[id].lastname, gender: all[id].gender, email: all[id].contact.email, address: all[id].contact.address, city: all[id].contact.city, country: all[id].contact.country, pos, phone: all[id].contact.phone, pet: all[id].preferences.favorite_pet, fruit: all[id].preferences.favorite_fruit, color: all[id].preferences.favorite_color, movie: all[id].preferences.favorite_movie });
            }
            initiateData(newtable);
            initiateTable();
        });
};
get('https://run.mocky.io/v3/70e5b0ad-7112-41c5-853e-b382a39e65b7');

//-----------------------------------------------------------------------\\

//Table
initiateData = function(data) {
    tabledata = data;
};

//initialize table
initiateTable = function() {
    table = new Tabulator("#my-table", {
        data: tabledata, //load row data from array
        layout: "fitColumns", //fit columns to width of table
        responsiveLayout: "hide", //hide columns that dont fit on the table
        tooltips: true, //show tool tips on cells
        addRowPos: "top", //when adding a new row, add it to the top of the table
        history: true, //allow undo and redo actions on the table
        pagination: "local", //paginate the data
        paginationSize: 30, //allow 7 rows per page of data
        paginationSizeSelector: [10, 30, 50, 100],
        movableColumns: true, //allow column order to be changed
        resizableRows: true, //allow row order to be changed
        initialSort: [ //set the initial sort order of the data
            { column: "id", dir: "asc" },
        ],
        columns: [ //define the table columns
            { title: "ID", field: "id", editor: "input" },
            { title: "First Name", field: "firstname", editor: "input" },
            { title: "Last Name", field: "lastname", editor: "input" },
            { title: "Gender", field: "gender", width: 95, editor: "select", editorParams: { values: ["male", "female"] } },
            { title: "E-Mail", field: "email", editor: "input" },
            { title: "Address", field: "address", editor: "input" },
            { title: "City", field: "city", editor: "input" },
            { title: "Country", field: "country", editor: "input" },
            { title: "Position", field: "pos", editor: "input" },
            { title: "Phone", field: "phone", editor: "input" },
            { title: "Favorite Pet", field: "pet", editor: "input" },
            { title: "Favorite Fruit", field: "fruit", editor: "input" },
            { title: "Favorite Color", field: "color", editor: "input" },
            { title: "Favorite Movie", field: "movie", editor: "input" },
        ],
    });
};


//Define variables for input elements
var fieldEl = document.getElementById("filter-field");
var typeEl = document.getElementById("filter-type");
var valueEl = document.getElementById("filter-value");

//Trigger setFilter function with correct parameters
function updateFilter() {
    var filterVal = fieldEl.options[fieldEl.selectedIndex].value;
    var typeVal = typeEl.options[typeEl.selectedIndex].value;

    var filter = filterVal == "function" ? customFilter : filterVal;

    if (filterVal == "function") {
        typeEl.disabled = true;
        valueEl.disabled = true;
    } else {
        typeEl.disabled = false;
        valueEl.disabled = false;
    }

    if (filterVal) {
        table.setFilter(filter, typeVal, valueEl.value);
    }
}

//Update filters on value change
document.getElementById("filter-field").addEventListener("change", updateFilter);
document.getElementById("filter-type").addEventListener("change", updateFilter);
document.getElementById("filter-value").addEventListener("keyup", updateFilter);

//Clear filters on "Clear Filters" button click
document.getElementById("filter-clear").addEventListener("click", function() {
    fieldEl.value = "";
    typeEl.value = "=";
    valueEl.value = "";

    table.clearFilter();
});

//trigger download of data.json file
document.getElementById("download-json").addEventListener("click", function() {
    table.download("json", "data.json");
});
//-----------------------------------------------------------------------\\