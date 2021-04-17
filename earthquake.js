// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1200;
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

var parseTime = d3.timeParse("%Y");

//

d3.csv("quake_df.csv").then(function(quakeData){
    console.log(quakeData)

    var parseTime = d3.timeParse("%Y");

    quakeData.forEach(function(data){

        data.Converted_Time_GMT = parseTime(data.Converted_Time_GMT );
        data.Magnitude = +data.Magnitude;
        data.Depth = +data.Depth;
    });

    var xTimeScale = d3.scaleTime()
    .domain(d3.extent(quakeData, d=> d.date))
    .range([0,width]);

    var yLinearScale1 = d3.scaleLinear()
    .domain([0,d3.max(quakeData, d=>d.Magnitude)])
    .range([height,0]);


    var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.timeFormat("%Y"));
    var leftAxis = d3.axisLeft(yLinearScale1);


    // Add bottomAxis
     chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    // Add leftAxis to the left side of the display
    chartGroup.append("g").call(leftAxis);

      // Line generators for each line
    var line1 = d3
    .line()
    .x(d => xTimeScale(d.Converted_Time_GMT))
    .y(d => yLinearScale1(d.Magnitude));

    var line2 = d3
    .line()
    .x(d => xTimeScale(d.Converted_Time_GMT))
    .y(d => yLinearScale1(d.Depth));

      // Append a path for line1
    chartGroup.append("path")
    .data([quakeData])
    .attr("d", line1)
    .classed("line green", true);

    // Append a path for line2
    chartGroup.append("path")
    .data([quakeData])
    .attr("d", line2)
    .classed("line orange", true);

}).catch(function(error){
    console.log(error);

});