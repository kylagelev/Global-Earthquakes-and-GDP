// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%B");


d3.csv("Data/GDP_IDN.csv").then(function(gdpData){
console.log(gdpData)

// gdpData.forEach(function(data) {
//   data.Year =  parseTime(data.Year);
// });

  var xTimeScale = d3.scaleLinear()
  .range([0,chartWidth])
  .domain(d3.extent(gdpData, data=>data.Year))

  var yLinearScale =d3.scaleLinear()
    .range([chartHeight,0])
    .domain([0,d3.max(gdpData,data=>data.GDPgrowth)])

  

  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale)

  var drawLine = d3
  .line()
  .x(data => xTimeScale(data.Year))
  .y(data => yLinearScale(data.GDPgrowth));

  chartGroup.append("path")
  // The drawLine function returns the instructions for creating the line for milesData
  .attr("d", drawLine(gdpData))
  .attr("fill", "gray")
  .classed("line", true);

chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", "translate(0, " + chartHeight + ")")
    .call(bottomAxis);

chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data([gdpData])
    .enter()
    .append("circle")
    .attr("r", "10")
    .attr("fill", "red");
  
    circlesGroup.on("mouseover", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 20)
        .attr("fill", "lightblue");
    })

    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 10)
        .attr("fill", "red");
    });
  
    chartGroup.selectAll("circle")
    .transition()
    .duration(1000)
    .attr("cx", data => xTimeScale(data.Year))
    .attr("cy", data => yLinearScale(data.GDPgrowth));
})


