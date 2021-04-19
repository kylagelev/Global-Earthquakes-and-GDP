// Define SVG area dimensions
var svgWidth = 1000;
var svgHeight = 1000;

// Define the chart's margins as an object
var margin = {
  top: 20,
  right: 40,
  bottom: 50,
  left: 150
};

// Define dimensions of the chart area
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Append a group area, then set its margins
var chartGroup = svg
  .append("g")
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

//time scale
var parseTime = d3.timeParse("%Y");

//max values array to select largest value
max_values = []
min_values = []

//IDN
IDN = []
files[0].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      // data.Year = +data.Year
      data.GDP = +data.GDP

      IDN_json = {'Year': data.Year, 'GDP': data.GDP}
      IDN.push(IDN_json)
    }
})
console.log(IDN)


//going through list to find max values in IDN
max_IDN = 0
for (var i=0; i<IDN.length; i++){
  if (IDN[i].GDP > max_IDN){
    max_IDN = IDN[i].GDP
  }
}
console.log(max_IDN)
max_values.push(max_IDN)

//going through list to find min values in IDN
min_IDN = 90000000000000000000000
for (var i=0; i<IDN.length; i++){
  if (IDN[i].GDP < min_IDN){
    min_IDN = IDN[i].GDP
  }
}
console.log(min_IDN)
min_values.push(min_IDN)

//BRA
BRA = []
files[1].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      BRA_json = {'Year': data.Year, 'GDP': data.GDP}
      BRA.push(BRA_json)
    }
})
console.log(BRA)

//going through list to find max values in BRA
max_BRA = 0
for (var i=0; i<BRA.length; i++){
  if (BRA[i].GDP > max_BRA){
    max_BRA = BRA[i].GDP
  }
}
// console.log(max_BRA)
max_values.push(max_BRA)

//going through list to find min values in BRA
min_BRA = 90000000000000000000000
for (var i=0; i<BRA.length; i++){
  if (BRA[i].GDP < min_BRA){
    min_BRA = BRA[i].GDP
  }
}
// console.log(min_BRA)
min_values.push(min_BRA)

//CHN
CHN = []
files[2].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      CHN_json = {'Year': data.Year, 'GDP': data.GDP}
      CHN.push(CHN_json)
    }
})
console.log(CHN)

//going through list to find max values in CHN
max_CHN = 0
for (var i=0; i<CHN.length; i++){
  if (CHN[i].GDP > max_CHN){
    max_CHN = CHN[i].GDP
  }
}
// console.log(max_CHN)
max_values.push(max_CHN)

//going through list to find min values in CHN
min_CHN = 90000000000000000000000
for (var i=0; i<CHN.length; i++){
  if (CHN[i].GDP < min_CHN){
    min_CHN = CHN[i].GDP
  }
}
min_values.push(min_CHN)

//GBR
GBR = []
files[3].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      GBR_json = {'Year': data.Year, 'GDP': data.GDP}
      GBR.push(GBR_json)
    }
})
console.log(GBR)

//going through list to find max values in GBR
max_GBR = 0
for (var i=0; i<GBR.length; i++){
  if (GBR[i].GDP > max_GBR){
    max_GBR = GBR[i].GDP
  }
}
// console.log(max_GBR)
max_values.push(max_GBR)

//going through list to find min values in GBR
min_GBR = 90000000000000000000000
for (var i=0; i<GBR.length; i++){
  if (GBR[i].GDP < min_GBR){
    min_GBR = GBR[i].GDP
  }
}
min_values.push(min_GBR)

//IND
IND = []
files[4].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      IND_json = {'Year': data.Year, 'GDP': data.GDP}
      IND.push(IND_json)
    }
})
console.log(IND)

//going through list to find max values in IND
max_IND = 0
for (var i=0; i<IND.length; i++){
  if (IND[i].GDP > max_IND){
    max_IND = IND[i].GDP
  }
}
// console.log(max_IND)
max_values.push(max_IND)

//going through list to find min values in IND
min_IND = 90000000000000000000000
for (var i=0; i<IND.length; i++){
  if (IND[i].GDP < min_IND){
    min_IND = IND[i].GDP
  }
}
min_values.push(min_IND)

//RUS
RUS = []
files[5].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      RUS_json = {'Year': data.Year, 'GDP': data.GDP}
      RUS.push(RUS_json)
    }
})
console.log(RUS)

//going through list to find max values in RUS
max_RUS = 0
for (var i=0; i<RUS.length; i++){
  if (RUS[i].GDP > max_RUS){
    max_RUS = RUS[i].GDP
  }
}
// console.log(max_RUS)
max_values.push(max_RUS)

min_RUS = 90000000000000000000000
//going through list to find min values in RUS
for (var i=0; i<RUS.length; i++){
  if (RUS[i].GDP < min_RUS){
    min_RUS = RUS[i].GDP
  }
}
min_values.push(min_RUS)

//USA
USA = []
files[6].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = parseTime(data.Year)
      data.GDP = +data.GDP

      USA_json = {'Year': data.Year, 'GDP': data.GDP}
      USA.push(USA_json)
    }
})

//going through list to find max values in USA
max_USA = 0
for (var i=0; i<USA.length; i++){
  if (USA[i].GDP > max_USA){
    max_USA = USA[i].GDP
  }
}
// console.log(max_USA)
max_values.push(max_USA)

//going through list to find min values in USA
min_USA = 90000000000000000000000
for (var i=0; i<USA.length; i++){
  if (USA[i].GDP < min_USA){
    min_USA = USA[i].GDP
  }
}
console.log(min_USA)
min_values.push(min_USA)

console.log(min_values)

//finding max value overall for yscale
for (var i=0; i<max_values.length; i++){
  max = max_values[i]
  if (max_values[i] > max){
    max = max_values[i]
  }
}
console.log(max)

//finding min value overall for yscale
for (var j=0; j<min_values.length; j++){
    min = min_values[j-1]
  if (min > min_values[j]){
    min = min_values[j]
  }
}
console.log(min)

//need to make function that goes through all data
function goingthroughdate(data){
  for (var i=0; i<data.length; i++){
    data[i].Year
    return data[i].Year
  }
}

function goingthroughGDP(data){
  for (var i=0; i<data.length-1; i++){
    data[i].GDP
    return data[i].GDP
  }
}

//making the actual chart with the x and y scale
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(files[0], d => d.Year))
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([min, max])
    .range([height, 0]);

  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

    // Add x-axis
  chartGroup
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y-axis
  chartGroup
    .append("g")
    .call(leftAxis);

  var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width/2}, ${height + 20} )`);
  
  labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "years") // value to grab for event listener
      .text("Years (2000-2019)");

  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+20) 
    .attr("x", 0 - (height / 2)  )
    .attr("dy", "1em")
    .text("GDP ($USD)")

  //drawing lines in this method, initially
  var lineIDN = d3.line()
    .x(d => xTimeScale(files[0].Year))
    .y(d => yLinearScale(files[0].GDP));

  console.log(goingthroughGDP(IDN))

  chartGroup
    .data(files[0])
    .append("path")
    .attr("d", lineIDN)
    .classed('red', true);

  var lineBRA = d3.line()
  .x(d => xTimeScale(BRA.Year))
  .y(d => yLinearScale(BRA.GDP));

  var lineCHN = d3.line()
  .x(d => xTimeScale(CHN.Year))
  .y(d => yLinearScale(CHN.GDP));

  var lineGBR = d3.line()
  .x(d => xTimeScale(GBR.Year))
  .y(d => yLinearScale(GBR.GDP));

  var lineIND = d3.line()
  .x(d => xTimeScale(IND.Year))
  .y(d => yLinearScale(IND.GDP));

  var lineRUS = d3.line()
    .x(d => xTimeScale(RUS.Year))
    .y(d => yLinearScale(RUS.GDP));

  var lineUSA = d3.line()
  .x(d => xTimeScale(USA.Year))
  .y(d => yLinearScale(USA.GDP));
  









//checking to see that the values were converted to numbers
// console.log(files)

//   var xTimeScale = d3.scaleTime()
//   .range([0,chartWidth])
//   .domain(d3.extent(files, files=>files.Year))

//   var yLinearScale = d3.scaleLinear()
//   .range([chartHeight,0])
//   .domain([d3.min(files, files=>files.GDP),d3.max(files, files=>files.GDP)])

//   var bottomAxis = d3.axisBottom(xTimeScale);
//   var leftAxis = d3.axisLeft(yLinearScale)

// //Add x-axis
//   chartGroup
      // .append("g")
//   .attr("transform", `translate(0, ${chartHeight})`)
//   .call(bottomAxis);

// // Add y-axis
//   chartGroup.append("g").call(leftAxis);

//   var labelsGroup = chartGroup.append("g")
//   .attr("transform", `translate(${chartWidth/2}, ${chartHeight + 20} )`);
  
//   labelsGroup.append("text")
//       .attr("x", 0)
//       .attr("y", 20)
//       .attr("value", "years") // value to grab for event listener
//       .text("Years (2000-2019)");

//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left+40) 
//     .attr("x", 0 - (chartHeight / 2)  )
//     .attr("dy", "1em")
//     .text("GDP ($USD)")

//drawing lines in this method, initially
  // var lineIDN = d3.line()
  //   .x(d => xTimeScale(IDN.Year))
  //   .y(d => yLinearScale(IDN.GDP));

  // chartGroup
  //   .append("path")
  //   .attr("d", lineIDN(files[0]))
  //   .classed('red', true);

  // var lineBRA = d3.line()
  // .x(d => xTimeScale(files[1].Year))
  // .y(d => yLinearScale(files[1].GDP));

  // var lineCHN = d3.line()
  // .x(d => xTimeScale(files[2].Year))
  // .y(d => yLinearScale(files[2].GDP));

  // var lineGBR = d3.line()
  // .x(d => xTimeScale(files[3].Year))
  // .y(d => yLinearScale(files[3].GDP));

  // var lineIND = d3.line()
  // .x(d => xTimeScale(files[4].Year))
  // .y(d => yLinearScale(files[4].GDP));

  // var lineRUS = d3.line()
  //   .x(d => xTimeScale(files[5].Year))
  //   .y(d => yLinearScale(files[5].GDP));

  // var lineUSA = d3.line()
  // .x(d => xTimeScale(files[6].Year))
  // .y(d => yLinearScale(files[6].GDP));
  

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