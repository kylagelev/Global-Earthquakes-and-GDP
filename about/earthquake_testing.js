// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1600;
var svgHeight = 660;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// append svg and group
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//var parseTime = d3.timeParse("%Y");

var chosenYAxis = "Magnitude";


function yScale(quakeData, chosenYAxis){
  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(quakeData,[chosenYAxis]) * 0.8,
             d3.max(quakeData, d => d[chosenYaxis]) * 1.2])
    .range([0,width]);

    return xLinearScale;
}

function renderAxes(newYScale, yAxis){
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
    
}

d3.csv("quake_df.csv").then(function(quakeData){
    // console.log(quakeData);
    // console.log(quakeData[0].Magnitude);
    // console.log(quakeData[0].Depth);
    // console.log(quakeData[0].Converted_Time_GMT);

    var parseTime = d3.timeParse("%Y-%m-%d");
    
    quakeData.forEach(function(data){

        //Convert magnitude and depth data into numeric data type since extracted as text from csv
        
        data.Converted_Time_GMT = parseTime(data.Converted_Time_GMT);
        data.Magnitude = +data.Magnitude;
        data.Depth = +data.Depth

        // console.log(data.Magnitude)
        console.log(data.Converted_Time_GMT)

    });

    // Sort quakeData by date
    const sortedData = quakeData.sort((a,b) => b.Converted_Time_GMT - a.Converted_Time_GMT)



    var xTimeScale = d3.scaleTime()
    .domain(d3.extent(sortedData, d => d.Converted_Time_GMT))
    .range([0,width]);


    var yLinearScale1 = d3.scaleLinear()
    .domain([6.5,d3.max(sortedData, d => d.Magnitude)])
    .range([height,0]);

    var yLinearScale2 = xScale(sortedData, chosenYAxis)


    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale1);


    // Add bottomAxis
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    // Add leftAxis to the left side of the display
    chartGroup.append("g").call(leftAxis);

      // Line generators for each line
    var line1 = d3
    .line()
    //.defined(d=> !isNaN(d.Magnitude))
    .x(d => xTimeScale(d.Converted_Time_GMT))
    .y(d => yLinearScale1(d.Magnitude));

    var line2 = d3
    .line()
    //.defined(d=> !isNaN(d.Magnitude))
    .x(d => xTimeScale(d.Converted_Time_GMT))
    .y(d => yLinearScale1(d.Depth));

    // Append a path for line1
    chartGroup.append("path")
    .data([sortedData])
    .attr("d", line1)
    .attr("stroke","black")
    .attr("stroke-width",2)
    .attr("fill","black");

      // Add labels for x and y labels

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",0-margin.left + 40)
    .attr("x", 0-(height/2))
    .attr("dy", "1em")
    .attr("class","axisText")
    .text("Magnitude of Earthquake");

    chartGroup.append("text")
    .attr("transform",`translate(${width/2}, ${height + margin.top})`)
    .attr("class", "axisText")
    .text("Time (Year)");



}).catch(function(error){
    console.log(error);

});