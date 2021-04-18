// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 100
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

var line_colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']

  Promise.all([d3.csv("../Data/GDP_IDN.csv"), 
               d3.csv("../Data/GDP_BRA.csv"),
               d3.csv("../Data/GDP_CHN.csv"),
               d3.csv("../Data/GDP_GBR.csv"),
               d3.csv("../Data/GDP_IND.csv"),
               d3.csv("../Data/GDP_RUS.csv"),
               d3.csv("../Data/GDP_USA.csv")]).then(function(files){


for (var i=0; i<files.length; i++){
  files[i].forEach(function(data){
  if (data.Year != '2020'){
  data.Year = +data.Year
  data.GDP = +data.GDP
  }
  })
}

//checking to see that the values were converted to numbers
console.log(files)

  var xTimeScale = d3.scaleTime()
  .range([0,chartWidth])
  .domain(d3.extent(files, data=>data.Year))

  var yLinearScale =d3.scaleLinear()
  .range([chartHeight,0])
  .domain([0,d3.max(files, data=>data.GDP)])

  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale)

//Add x-axis
  chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

// Add y-axis
  chartGroup.append("g").call(leftAxis);

  var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20} )`);
  
  labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "years") // value to grab for event listener
      .classed("active", true)
      .text("Years (2000-2019)");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+40) 
    .attr("x", 0 - (chartHeight / 2)  )
    .attr("dy", "1em")
    .text("GDP ($USD)")

//so now need to draw a line for each country
for (var i=0; i<files.length; i++){
  if (typeof files[i].GDP === 'number') {
  // if ((files[i].Year == null) && (files[i].GDP == null)){
  //   console.log(files[i])
  //   console.log(files[i])
    // files[i].Year.remove()
    // files[i].GDP.remove()
// }
  var line = d3.line()
  .x(d => xTimeScale(files[i].Year))
  .y(d => yLinearScale(files[i].GDP));

  console.log("Trying")



  chartGroup
  .append("path")
  .attr("d", line(files[i]))
  .classed(line_colors[i], true);

}
}
        }).catch(function(error) {
  console.log(error);
});