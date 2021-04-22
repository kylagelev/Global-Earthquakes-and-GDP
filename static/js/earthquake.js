function makeResponsive(){


// var svgArea = d3.select("body").select("svg");

//   // clear svg is not empty
//   if (!svgArea.empty()) {
//     svgArea.remove();
//   }


// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
var svgWidth = 1600;
var svgHeight = 660;

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 100
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


d3.csv("../Data_Cleaning/earthquake_csv/quake_df.csv").then(function(quakeData){
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
    .domain([6.8,d3.max(sortedData, d => d.Magnitude)])
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
    //.defined(d=> !isNaN(d.Magnitude))
    .x(d => xTimeScale(d.Converted_Time_GMT))
    .y(d => yLinearScale1(d.Magnitude));



    // Append a path for line1
    // chartGroup.append("path")
    // .data([sortedData])
    // .attr("d", line1)
    // .attr("stroke","black")
    // .attr("stroke-width",2)
    // .attr("fill","none");

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

    // Add Scale for Bubble Size

    var z = d3.scaleSqrt()
      .domain([d3.min(sortedData,d=>d.Depth),d3.max(sortedData, d => d.Depth)])
      .range([0,30]);

  // // Hover Event

  //   // What to do when one group is hovered
  //   var highlight = function(d){
  //     // reduce opacity of all groups
  //     d3.selectAll(".bubbles").style("opacity", .05)
  //     // expect the one that is hovered
  //     d3.selectAll("."+d).style("opacity", 1)
  //   }

  //   // And when it is not hovered anymore
  //   var noHighlight = function(d){
  //     d3.selectAll(".bubbles").style("opacity", 0.8)
  // }


  // Circle Markers
  var circleGroup = chartGroup.append('g')
    .selectAll("dot")
    .data(sortedData)
    .enter()
    .append("circle")
    .attr("class", function(d) { return "bubbles" + d.magnitude} )
    .attr("cx", d => xTimeScale(d.Converted_Time_GMT))
    .attr("cy", d => yLinearScale1(d.Magnitude))
    .attr("r", d => z(d.Depth))
    .style("fill","gray");

    // Tool Tip
    var toolTip = d3.select("svg")
      .append("div")
      .classed("tooltip",true);
      //.style("opacity", 0) 
      //.style("background-color", "grey")
      // .style("border-radius", "5px")
      // .style("padding", "10px")
      // .style("color", "white");

    circleGroup.on("mouseover", function(sortedData){
      toolTip.style("display", "block")
          .html(
            `<strong>${(sortedData.Converted_Time_GMT)}<strong><hr>${(sortedData.Place)}<hr>Magnitude: ${(sortedData.Magnitude)}<hr>Depth: ${(sortedData.Depth)}`)
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY + "px");
    })
        // Step 3: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function() {
          toolTip.style("display", "none");
        });

}).catch(function(error){
    console.log(error);

});

}

makeResponsive();

d3.select(window).on("resize",makeResponsive);