var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  Promise.all([d3.csv("../Data/GDP_IDN.csv"), 
               d3.csv("../Data/GDP_BRA.csv"),
               d3.csv("../Data/GDP_CHN.csv"),
               d3.csv("../Data/GDP_GBR.csv"),
               d3.csv("../Data/GDP_IND.csv"),
               d3.csv("../Data/GDP_RUS.csv"),
               d3.csv("../Data/GDP_USA.csv")]).then(function(files){

var parseTime = d3.timeParse("%Y");

for (var i=0; i<files.length; i++){
  files[i].forEach(function(data){
  data.Year = parseTime(data.Year)
  data.GDP = +data.GDP
  })
  }

var xTimeScale = d3.scaleTime()
  .domain(d3.extent(files, d => d.Year))
  .range([0, width]);

var yLinearScale = d3.scaleLinear()
  .range([height, 0])
  .domain([d3.min(files, d => d.GDP), d3.max(files, d => d.GDP)]);

var bottomAxis = d3.axisBottom(xTimeScale);
var leftAxis = d3.axisLeft(yLinearScale);

//add x-axis
chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

// Add y-axis
chartGroup
  .append("g")
  .call(leftAxis);

var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20} )`);

labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "years") // value to grab for event listener
  .text("Years (2000-2019)");


chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left+40) 
.attr("x", 0 - (chartHeight / 2)  )
.attr("dy", "2em")
.text("GDP ($USD)")

//drawing lines in this method, initially
var lineIDN = d3.line()
.x(d => xTimeScale(files[0].Year))
.y(d => yLinearScale(files[0].GDP));

chartGroup
.data([files[0]])
.append("path")
.attr("d", lineIDN)
.classed('red', true);


              })