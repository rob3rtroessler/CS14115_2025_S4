// SVG Size
let width = 700,
	height = 500;


// Load CSV file
d3.csv("data/wealth-health-2014.csv", d => {

	d.Income = +d.Income
	d.Population = +d.Population
	d.LifeExpectancy = +d.LifeExpectancy
	console.log(d)

	return d;
}).then( data => {

	// // Analyze the dataset in the web console
	// console.log(data);
	// console.log("Countries: " + data.length)

	drawChart(data)

});

function drawChart(data){
	// do whatever

	console.log(data)

	// Margin object with properties for the four directions
	let margin = {top: 20, right: 10, bottom: 20, left: 30};

// Width and height as the inner dimensions of the chart area
	let width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

// Define 'svg' as a child-element (g) from the drawing area and include spaces
	let svg = d3.select("#chart-area").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	let lifeExpectancyScale = d3.scaleLinear()
		.domain(d3.extent(data, function(d,i){ // long form solution
			return d.LifeExpectancy
		}))
		.range([height, 0])

	let incomeScale = d3.scaleLog()
		.domain(d3.extent(data, d => d.Income))
		.range([0, width])

	let populationScale = d3.scaleLinear()
		.domain(d3.extent(data, d => d.Population))
		.range([4,30])

	let colorScale = d3.scaleOrdinal()
		.domain(data.map(d => d.Region))
		.range(d3.schemeCategory10)


	let xAxis = d3.axisBottom()
		.scale(incomeScale)

	let yAxis = d3.axisLeft()
		.scale(lifeExpectancyScale)

	svg.append("g")
		.attr("class", "axis x-axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "axis y-axis")
		.call(yAxis)

	let circles = svg.selectAll("circle").data(data)

	circles.enter()
		.append("circle")
		.attr("class", "country-circle")
		.attr("cx", d => incomeScale(d.Income)) // arrow function
		.attr("r", 0)
		.attr("cy", function (d,i){ // long form
			return lifeExpectancyScale(d.LifeExpectancy)
		})
		.transition()
		.duration(500)
		.attr("r", d => populationScale(d.Population))
		.attr("cx", d => incomeScale(d.Income)) // arrow function
		.attr("cy", function (d,i){ // long form
			return lifeExpectancyScale(d.LifeExpectancy)
		})
		.attr("fill", d => colorScale(d.Region))
		.style("opacity", 0.7)
		.style("stroke", "black")
}
