
// Global variable with 60 attractions (JSON format)
// console.log(attractionData);

dataFiltering();

function dataFiltering() {
	let attractions = attractionData;

	// log initial data
	console.log(attractions)

	// grab categories from HTML
	let category = document.getElementById("attraction-category").value

	// log selected category
	console.log(category)

	let filteredData = attractions.filter(function (d,i){
		if (category === "all"){
			return true
		} else {
			return d.Category === category
		}
	})

	// sort data
	let sortedData = filteredData.sort(function (a,b) {
		return b.Visitors - a.Visitors
	})

	// grab top 5
	let topFiveAttractions = filteredData.filter(function (d,i){
		return i < 5
	})

	renderBarChart(topFiveAttractions)

}