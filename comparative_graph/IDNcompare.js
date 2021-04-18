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

//ok so maybe want to first do individual files and put them into individual json object
//from there use that data create the graph?
//because I keep running into the problem that I have NaN values

//IDN
IDN = []
files[0].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      IDN_json = {'Year': data.Year, 'GDP': data.GDP}
      IDN.push(IDN_json)
    }
})
console.log(IDN)

//BRA
BRA = []
files[1].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      BRA_json = {'Year': data.Year, 'GDP': data.GDP}
      BRA.push(BRA_json)
    }
})
console.log(BRA)

//CHN
CHN = []
files[2].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      CHN_json = {'Year': data.Year, 'GDP': data.GDP}
      CHN.push(CHN_json)
    }
})
console.log(CHN)

//GBR
GBR = []
files[3].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      GBR_json = {'Year': data.Year, 'GDP': data.GDP}
      GBR.push(GBR_json)
    }
})
console.log(GBR)

//IND
IND = []
files[4].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      IND_json = {'Year': data.Year, 'GDP': data.GDP}
      IND.push(IND_json)
    }
})
console.log(IND)

//RUS
RUS = []
files[5].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      RUS_json = {'Year': data.Year, 'GDP': data.GDP}
      RUS.push(RUS_json)
    }
})
console.log(RUS)

//USA
USA = []
files[6].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      USA_json = {'Year': data.Year, 'GDP': data.GDP}
      USA.push(USA_json)
    }
})
console.log(USA)


// for (var i=0; i<files.length; i++){
//   // files[i].forEach(function(data){
//   // if (data.Year != '2020'){
//   // data.Year = +data.Year
//   // data.GDP = +data.GDP


//   // }
//   // })
// }

//checking to see that the values were converted to numbers
// console.log(files)

  var xTimeScale = d3.scaleTime()
  .range([0,chartWidth])
  .domain(d3.extent(files, files=>files.Year))

  var yLinearScale = d3.scaleLinear()
  .range([chartHeight,0])
  .domain([d3.min(files, files=>files.GDP),d3.max(files, files=>files.GDP)])

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
      .text("Years (2000-2019)");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+40) 
    .attr("x", 0 - (chartHeight / 2)  )
    .attr("dy", "1em")
    .text("GDP ($USD)")

//drawing lines in this method, initially
  var lineIDN = d3.line()
    .x(d => xTimeScale(files[0].Year))
    .y(d => yLinearScale(files[0].GDP));

  chartGroup
    .append("path")
    .attr("d", lineIDN(files[0]))
    .classed('red', true);

  var lineBRA = d3.line()
  .x(d => xTimeScale(files[1].Year))
  .y(d => yLinearScale(files[1].GDP));

  var lineCHN = d3.line()
  .x(d => xTimeScale(files[2].Year))
  .y(d => yLinearScale(files[2].GDP));

  var lineGBR = d3.line()
  .x(d => xTimeScale(files[3].Year))
  .y(d => yLinearScale(files[3].GDP));

  var lineIND = d3.line()
  .x(d => xTimeScale(files[4].Year))
  .y(d => yLinearScale(files[4].GDP));

  var lineRUS = d3.line()
    .x(d => xTimeScale(files[5].Year))
    .y(d => yLinearScale(files[5].GDP));

  var lineUSA = d3.line()
  .x(d => xTimeScale(files[6].Year))
  .y(d => yLinearScale(files[6].GDP));
  

// //so now need to draw a line for each country
// for (var i=0; i<files.length; i++){
//   if (typeof files[i].GDP === 'number') {
//   // if ((files[i].Year == null) && (files[i].GDP == null)){
//   //   console.log(files[i])
//   //   console.log(files[i])
//     // files[i].Year.remove()
//     // files[i].GDP.remove()
// // }
//   var line = d3.line()
//   .x(d => xTimeScale(files[i].Year))
//   .y(d => yLinearScale(files[i].GDP));

//   console.log("Trying")



//   chartGroup
//   .append("path")
//   .attr("d", line(files[i]))
//   .classed(line_colors[i], true);

// }
// }
        }).catch(function(error) {
  console.log(error);
});