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

// // Configure a parseTime function which will return a new Date object from a string

var parseTime = d3.timeParse("%Y");


// d3.csv("Data/GDP_IDN.csv").then(function(gdpData){
// console.log(gdpData)

// gdpData.forEach(function(data) {
//   data.Year =  parseTime(data.Year);
// });

//   var xTimeScale = d3.scaleTime()
//   .range([0,chartWidth])
//   .domain(d3.extent(gdpData, data=>data.Year))

//   var yLinearScale =d3.scaleLinear()
//     .range([chartHeight,0])
//     .domain([0,d3.max(gdpData,data=>data.GDPgrowth)])

  

//   var bottomAxis = d3.axisBottom(xTimeScale);
//   var leftAxis = d3.axisLeft(yLinearScale)

//   var drawLine = d3
//   .line()
//   .x(data => xTimeScale(data.Year))
//   .y(data => yLinearScale(data.GDPgrowth));

//   chartGroup.append("path")
//   // The drawLine function returns the instructions for creating the line for milesData
//   .attr("d", drawLine(gdpData))
//   .attr("fill", "gray")
//   .classed("line", true);

// chartGroup.append("g")
//     .classed("axis", true)
//     .attr("transform", "translate(0, " + chartHeight + ")")
//     .call(bottomAxis);

// chartGroup.append("g")
//     .classed("axis", true)
//     .call(leftAxis);

// var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)

//  labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "years") // value to grab for event listener
//     .classed("active", true)
//     .text("Years (2000-2019)");

//     // var circlesGroup = chartGroup.selectAll("circle")
//     // .data([gdpData])
//     // .enter()
//     // .append("circle")
//     // .attr("r", "15")
//     // .attr("fill", "red");
  
//     // circlesGroup.on("mouseover", function() {
//     //   d3.select(this)
//     //     .transition()
//     //     .duration(1000)
//     //     .attr("r", 20)
//     //     .attr("fill", "lightblue");
//     // })

//   var imageGroup=chartGroup.selectAll("image")
//     .data([gdpData])
//     .enter()
//     .append("image")
//     .attr('xlink:href', 'https://cdn.britannica.com/s:180x120,c:crop/38/4038-050-BDDBA6AB/Flag-Thailand.jpg')
//     .attr('width', 30)
//     .attr('height', 30)

  
  
//   //    // append y axis
//   chartGroup.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 0 - margin.left+20)
//   .attr("x", 0 - (chartHeight / 2))
//   .attr("dy", "1em")
//   .classed("axis-text", true)
//   .text("GDP Growth (%)")

//   chartGroup.append("text")
//   .attr("transform", "rotate(-90)")
//   .attr("y", 0 - margin.left+40) 
//   .attr("x", 0 - (chartHeight / 2)  )
//   .attr("dy", "1em")
//   .classed("axis-text", true)
//   .text("GDP ($USD)")

//     .on("mouseout", function() {
//       d3.select(this)
//         .transition()
//         .duration(1000)
//         .attr("r", 10)
//         .attr("fill", "red");
//     });
  
//     // chartGroup.selectAll("circle")
//     // .transition()
//     // .duration(1000)
//     // .attr("cx", data => xTimeScale(data[4].Year))
//     // .attr("cy", data => yLinearScale(data[4].GDPgrowth));

//     chartGroup.selectAll("image")
//     .transition()
//     .duration(1000)
//     .attr("x", data => xTimeScale(data[4].Year))
//     .attr("y", data => yLinearScale(data[4].GDPgrowth));
// })





//Initial Params

var chosenYAxis = "GDPgrowth"


function yScale(gdpData, chosenYAxis){
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(gdpData, d => d[chosenYAxis]) , 
  d3.max(gdpData, d=>d[chosenYAxis]) 
])
.range([chartHeight,0]);

return yLinearScale
}

// function used for updating yAxis var upon click on axis label
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale); 

  yAxis.transition()
       .duration(1000)
       .call(leftAxis)
  return yAxis

}


d3.csv("Data/GDP_IDN.csv").then(function(gdpData,err){
  if (err) throw err; 
console.log(gdpData)

gdpData.forEach(function(data) {
  data.Year =  parseTime(data.Year)
  data.GDPgrowth = +data.GDPgrowth
  data.GDP = +data.GDP
  data.GDPpercapita = +data.GDPpercapita
  console.log(data.Year)
});
var yLinearScale = yScale(gdpData,chosenYAxis)

var xTimeScale = d3.scaleTime()
  .range([0,chartWidth])
  .domain(d3.extent(gdpData, data=>data.Year))

  // Create initial axis functions
var bottomAxis = d3.axisBottom(xTimeScale);
var leftAxis = d3.axisLeft(yLinearScale);

//append x axis

var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0,${chartHeight})`)
    .call(bottomAxis)

//append y axis

var yAxis = chartGroup.append("g")
    .call(leftAxis)


var labelsGroup = chartGroup.append("g")
.attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20} )`);

 labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "years") // value to grab for event listener
    .classed("active", true)
    .text("Years (2000-2019)");
  //    // append y axis
  var GDPgrowthLabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left+20)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .attr("value", "GDPgrowth")
  .classed("active",true)
  .text("GDP Growth (%)")

  var GDPlabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left+40) 
  .attr("x", 0 - (chartHeight / 2)  )
  .attr("dy", "1em")
  .attr("value", "GDP")
  .classed("active", false)
  .text("GDP ($USD)")

  var GDPpercapitalabel = chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left) 
  .attr("x", 0 - (chartHeight / 2)  )
  .attr("dy", "1em")
  .attr("value","GDPpercapita")
  .classed("active",false)
  .text("GDP Per Capita ($USD)")
// y axis label event listener

chartGroup.selectAll("text")
.on("click",function(){

  var value = d3.select(this).attr("value")
  if(value !== chosenYAxis){

    chosenYAxis = value

    // functions here found above csv import
        // updates y scale for new data
      yLinearScale = yScale(gdpData,chosenYAxis)

      yAxis=renderYAxis(yLinearScale,yAxis)

      if (chosenYAxis === "GDPgrowth"){

        GDPgrowthLabel
        .classed("active",true)
        .classed("inactive",false)
        
        GDPlabel
        .classed("active",false)
        .classed("inactive",true)

        GDPpercapitalabel
        .classed("active",false)
        .classed("inactive",true)
      }
      else if (chosenYAxis === "GDP"){
        GDPgrowthLabel
        .classed("active",false)
        .classed("inactive",true)
        
        GDPlabel
        .classed("active",true)
        .classed("inactive",false)

        GDPpercapitalabel
        .classed("active",false)
        .classed("inactive",true)

      }
      else{

        GDPgrowthLabel
        .classed("active",false)
        .classed("inactive",true)
        
        GDPlabel
        .classed("active",false)
        .classed("inactive",true)

        GDPpercapitalabel
        .classed("active",true)
        .classed("inactive",false)
      
      }


  }


})
  
}).catch(function(error){
  console.log(error)
})
