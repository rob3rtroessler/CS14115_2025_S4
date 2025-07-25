/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

console.log('test')

// init global variables & switches
let myDataTable,
    myMapVis,
    myBarVisOne,
    myBarVisTwo,
    myBrushVis;

let selectedTimeRange = [];
let selectedState = '';

//####################################################################################################
//  TODO | Task MapVis-9 : Enable category selection







//####################################################################################################

// load data using promises
let promises = [

    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json"), // already projected -> you can just scale it to fit your browser window
    d3.csv("data/covid_data_20.csv"),
    d3.csv("data/census_usa.csv")
];

Promise.all(promises)
    .then(function (data) {
        initMainPage(data)
    })
    .catch(function (err) {
        console.log(err)
    });

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log('check out the data', dataArray);

    // init table
    myDataTable = new DataTable('tableDiv', dataArray[1], dataArray[2]);

    // ####################################################
    //  TODO | Task MapVis-1 :  init mapVis class instance
    // myMapVis = new MapVis('mapDiv', dataArray[0], ...



    //  TODO | Task BarVis-1 :  init barVis class instance
    // myBarVisOne = new BarVis('barDiv', ...
    // myBarVisTwo = new BarVis('...


    // init brush
    myBrushVis = new BrushVis('brushDiv', dataArray[1]);
}


