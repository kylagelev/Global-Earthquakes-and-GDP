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
  .attr("height", svgHeight)

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .style("color","blue")

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%Y");


d3.csv("Data/GDP_IDN.csv").then(function(gdpData){
console.log(gdpData)

gdpData.forEach(function(data) {
  data.Year =  parseTime(data.Year);
});

  var xTimeScale = d3.scaleTime()
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

var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)

 labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "years") // value to grab for event listener
    .classed("active", true)
    .text("Years (2000-2019)");

    // var circlesGroup = chartGroup.selectAll("circle")
    // .data([gdpData])
    // .enter()
    // .append("circle")
    // .attr("r", "15")
    // .attr("fill", "red");
  
    // circlesGroup.on("mouseover", function() {
    //   d3.select(this)
    //     .transition()
    //     .duration(1000)
    //     .attr("r", 20)
    //     .attr("fill", "lightblue");
    // })

  var imageGroup=chartGroup.selectAll("image")
    .data([gdpData])
    .enter()
    .append("image")
    .attr('xlink:href', 'https://cdn.britannica.com/s:180x120,c:crop/38/4038-050-BDDBA6AB/Flag-Thailand.jpg')
    .attr('width', 30)
    .attr('height', 30)

  
  
  //    // append y axis
  chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("GDP Growth (%)")

    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(1000)
        .attr("r", 10)
        .attr("fill", "red");
    });
  
    // chartGroup.selectAll("circle")
    // .transition()
    // .duration(1000)
    // .attr("cx", data => xTimeScale(data[4].Year))
    // .attr("cy", data => yLinearScale(data[4].GDPgrowth));

    chartGroup.selectAll("image")
    .transition()
    .duration(1000)
    .attr("x", data => xTimeScale(data[4].Year))
    .attr("y", data => yLinearScale(data[4].GDPgrowth));
})


