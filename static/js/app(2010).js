function init() {
  // Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 170
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




var dropdownMenu = d3.select("#selDataset")

var dataset = dropdownMenu.property("value")

d3.csv("../Data_Cleaning/GDP_csvs/GDP_CHL.csv").then(function(gdpData){
  console.log(gdpData)
  
  gdpData.forEach(function(data) {
    data.Year =  parseTime(data.Year)
    data.GDP = +data.GDP
    data.GDPgrowth = +data.GDPgrowth
  });
  
    var xTimeScale = d3.scaleTime()
    .range([0,chartWidth])
    .domain(d3.extent(gdpData, data=>data.Year))
  
    var yLinearScale =d3.scaleLinear()
    .range([chartHeight,0])
    .domain([d3.min(gdpData,data=>data.GDPgrowth),d3.max(gdpData,data=>data.GDPgrowth)])
  
  
  
    
  
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
  
      var toolTip = d3.select("body")
      .append("div")
      .classed("tooltip", true);
  
  var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
  
   labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "years") // value to grab for event listener
      .classed("active", true)
      .text("Years (2000-2019)")
      .style("color","black")
  
      var circlesGroup = chartGroup.selectAll("circle")
      .data([gdpData])
      .enter()
      .append("circle")
      .attr("r", "4")
      .attr("fill", "black");
    
      // circlesGroup.on("mouseover", function(){
      //   d3.select(this)
      //     .transition()
      //     .duration(1000)
      //     .attr("r", 20)
      //     .attr("fill", "lightblue");
      // })
      var dateFormatter = d3.timeFormat("%Y");
  
      var imageGroup=chartGroup.selectAll("image")
      .data([gdpData])
      .enter()
      .append("image")
      .attr('xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABlCAMAAAB3G4FZAAAAhFBMVEXVKx7///8AOabqqafTDgAAJKDFy+QAOquMMnDcKgy7w+AAN6UANaUAK6IALqMAMaQAGp7f4vAYP6hfbLiRns7o6vQACZxIW7H5+v2QmswsSKsaPKeQlsoAEp3S2OsAAJiBkciyvN2fp9Lw8vhWZraCi8Zld72ortU/UK5xfb+HKWzOiZYX9koWAAABZUlEQVRoge2Y21KDMBRFoRrU5sJF7rTUFkWq//9/clEspD7wwsnYvd4yJzOsmZ2ck8HaLIU59gpY8IIXvOAFr9v24txILx4Uf4jReonnUJroJcPIM9Er9tNEmOclktTOrgdJ6iUz2/Zj87xiv63lV4Ok9OJFV9spU7wUG9jvulp5+F4qYi/14mwHor54HBZO5tJ6cZVd23NyOa3XhrMkmu+oXtlkItGce1dtpxucYnb6ie4j37+lF/XQmzcLsj7BgvKnGiX6kKTrX9745SrQHztkXiKvxnLtmuOlzr9lx6Acvf5GvvctP9KDpPLiQRdj7bGma2V6kFRebhtjKdumJQ7HdhRpQVJ5tbfxxIamxeoqlfMgqfoq9+tx8MimPM+DpPJq8ov3sxDaK5/s3E+C49qbFf8B4AUveMELXvAi83pYykpej0v5+LxbAetpMfdrYAEAAAAAAAAAAAAAAAAAAAAAwD/nC/ngOwaaD33NAAAAAElFTkSuQmCC')
      .attr('width', 30)
      .attr('height', 30)
  
  
      imageGroup.on("mouseover", function(gdpData) {
        toolTip.style("display", "block")
            .html(
              `<strong>Year:${dateFormatter(gdpData[10].Year)}<strong><hr>GDP Growth:${(gdpData[10].GDPgrowth)}
          %<hr>Location:Chile`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
      })
      .on("mouseout", function() {
        toolTip.style("display", "none");
      });
    
      
  
    
    //    // append y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left+20)
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
  
      chartGroup.selectAll("circle")
      .transition()
      .duration(1000)
      .attr("cx", data => xTimeScale(data[10].Year))
      .attr("cy", data => yLinearScale(data[10].GDPgrowth));
    
      chartGroup.selectAll("image")
      .transition()
      .duration(1000)
      .attr("x", data => xTimeScale(data[10].Year))
      .attr("y", data => yLinearScale(data[10].GDPgrowth));
  })
}

function makeResponsive() {
  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");
  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
    }}

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly(){
  makeResponsive()
    // Define SVG area dimensions
    var svgWidth = 960;
    var svgHeight = 500;
    
    // Define the chart's margins as an object
    var margin = {
      top: 60,
      right: 60,
      bottom: 60,
      left: 170
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
    
    
    
    
    var dropdownMenu = d3.select("#selDataset")
    
    var dataset = dropdownMenu.property("value")
    
    if (dataset === 'dataset1') {
      
    d3.csv("./Data_Cleaning/GDP_csvs/GDP_CHL.csv").then(function(gdpData){
    console.log(gdpData)
    
    gdpData.forEach(function(data) {
      data.Year =  parseTime(data.Year)
      data.GDP = +data.GDP
      data.GDPgrowth = +data.GDPgrowth
    });
    
      var xTimeScale = d3.scaleTime()
      .range([0,chartWidth])
      .domain(d3.extent(gdpData, data=>data.Year))
    
      var yLinearScale =d3.scaleLinear()
        .range([chartHeight,0])
        .domain([d3.min(gdpData,data=>data.GDPgrowth),d3.max(gdpData,data=>data.GDPgrowth)])
    
      
    
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
    
        var toolTip = d3.select("body")
        .append("div")
        .classed("tooltip", true);
    
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
    
     labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "years") // value to grab for event listener
        .classed("active", true)
        .text("Years (2000-2019)");
    
        var circlesGroup = chartGroup.selectAll("circle")
        .data([gdpData])
        .enter()
        .append("circle")
        .attr("r", "4")
        .attr("fill", "black");
      
        // circlesGroup.on("mouseover", function(){
        //   d3.select(this)
        //     .transition()
        //     .duration(1000)
        //     .attr("r", 20)
        //     .attr("fill", "lightblue");
        // })
        var dateFormatter = d3.timeFormat("%Y");
    
        var imageGroup=chartGroup.selectAll("image")
        .data([gdpData])
        .enter()
        .append("image")
        .attr('xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABlCAMAAAB3G4FZAAAAhFBMVEXVKx7///8AOabqqafTDgAAJKDFy+QAOquMMnDcKgy7w+AAN6UANaUAK6IALqMAMaQAGp7f4vAYP6hfbLiRns7o6vQACZxIW7H5+v2QmswsSKsaPKeQlsoAEp3S2OsAAJiBkciyvN2fp9Lw8vhWZraCi8Zld72ortU/UK5xfb+HKWzOiZYX9koWAAABZUlEQVRoge2Y21KDMBRFoRrU5sJF7rTUFkWq//9/clEspD7wwsnYvd4yJzOsmZ2ck8HaLIU59gpY8IIXvOAFr9v24txILx4Uf4jReonnUJroJcPIM9Er9tNEmOclktTOrgdJ6iUz2/Zj87xiv63lV4Ok9OJFV9spU7wUG9jvulp5+F4qYi/14mwHor54HBZO5tJ6cZVd23NyOa3XhrMkmu+oXtlkItGce1dtpxucYnb6ie4j37+lF/XQmzcLsj7BgvKnGiX6kKTrX9745SrQHztkXiKvxnLtmuOlzr9lx6Acvf5GvvctP9KDpPLiQRdj7bGma2V6kFRebhtjKdumJQ7HdhRpQVJ5tbfxxIamxeoqlfMgqfoq9+tx8MimPM+DpPJq8ov3sxDaK5/s3E+C49qbFf8B4AUveMELXvAi83pYykpej0v5+LxbAetpMfdrYAEAAAAAAAAAAAAAAAAAAAAAwD/nC/ngOwaaD33NAAAAAElFTkSuQmCC')
        .attr('width', 30)
        .attr('height', 30)
    
    
        imageGroup.on("mouseover", function(gdpData) {
          toolTip.style("display", "block")
              .html(
                `<strong>Year:${dateFormatter(gdpData[10].Year)}<strong><hr>GDP Growth:${(gdpData[10].GDPgrowth)}
            %<hr>Location:Chile`)
              .style("left", d3.event.pageX + "px")
              .style("top", d3.event.pageY + "px");
        })
        .on("mouseout", function() {
          toolTip.style("display", "none");
        });
      
        
    
      
      //    // append y axis
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+20)
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
    
        chartGroup.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx", data => xTimeScale(data[10].Year))
        .attr("cy", data => yLinearScale(data[10].GDPgrowth));
      
        chartGroup.selectAll("image")
        .transition()
        .duration(1000)
        .attr("x", data => xTimeScale(data[10].Year))
        .attr("y", data => yLinearScale(data[10].GDPgrowth));
    })
    
    }else if (dataset==='dataset2'){
      dataset !== 'dataset1'
      dataset !== 'dataset2'
      d3.csv("./Data_Cleaning/GDP_csvs/GDP_CHL.csv").then(function(gdpData){
        console.log(gdpData)
        
        gdpData.forEach(function(data) {
        data.Year =  parseTime(data.Year)
        data.GDP = +data.GDP
        data.GDPgrowth = +data.GDPgrowth
        });
        
          var xTimeScale = d3.scaleTime()
          .range([0,chartWidth])
          .domain(d3.extent(gdpData, data=>data.Year))
        
          var yLinearScale =d3.scaleLinear()
            .range([chartHeight,0])
            .domain([0,d3.max(gdpData,data=>data.GDP)])
        
          
        
          var bottomAxis = d3.axisBottom(xTimeScale);
          var leftAxis = d3.axisLeft(yLinearScale)
        
          var drawLine = d3
          .line()
          .x(data => xTimeScale(data.Year))
          .y(data => yLinearScale(data.GDP));
        
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
        
            var toolTip = d3.select("body")
            .append("div")
            .classed("tooltip", true);
        
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
        
         labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "years") // value to grab for event listener
            .classed("active", true)
            .text("Years (2000-2019)");
        
            var circlesGroup = chartGroup.selectAll("circle")
            .data([gdpData])
            .enter()
            .append("circle")
            .attr("r", "4")
            .attr("fill", "black");
          
            // circlesGroup.on("mouseover", function(){
            //   d3.select(this)
            //     .transition()
            //     .duration(1000)
            //     .attr("r", 20)
            //     .attr("fill", "lightblue");
            // })
            var dateFormatter = d3.timeFormat("%Y");
        
            var imageGroup=chartGroup.selectAll("image")
            .data([gdpData])
            .enter()
            .append("image")
            .attr('xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABlCAMAAAB3G4FZAAAAhFBMVEXVKx7///8AOabqqafTDgAAJKDFy+QAOquMMnDcKgy7w+AAN6UANaUAK6IALqMAMaQAGp7f4vAYP6hfbLiRns7o6vQACZxIW7H5+v2QmswsSKsaPKeQlsoAEp3S2OsAAJiBkciyvN2fp9Lw8vhWZraCi8Zld72ortU/UK5xfb+HKWzOiZYX9koWAAABZUlEQVRoge2Y21KDMBRFoRrU5sJF7rTUFkWq//9/clEspD7wwsnYvd4yJzOsmZ2ck8HaLIU59gpY8IIXvOAFr9v24txILx4Uf4jReonnUJroJcPIM9Er9tNEmOclktTOrgdJ6iUz2/Zj87xiv63lV4Ok9OJFV9spU7wUG9jvulp5+F4qYi/14mwHor54HBZO5tJ6cZVd23NyOa3XhrMkmu+oXtlkItGce1dtpxucYnb6ie4j37+lF/XQmzcLsj7BgvKnGiX6kKTrX9745SrQHztkXiKvxnLtmuOlzr9lx6Acvf5GvvctP9KDpPLiQRdj7bGma2V6kFRebhtjKdumJQ7HdhRpQVJ5tbfxxIamxeoqlfMgqfoq9+tx8MimPM+DpPJq8ov3sxDaK5/s3E+C49qbFf8B4AUveMELXvAi83pYykpej0v5+LxbAetpMfdrYAEAAAAAAAAAAAAAAAAAAAAAwD/nC/ngOwaaD33NAAAAAElFTkSuQmCC')
            .attr('width', 30)
            .attr('height', 30)
        
            var dateFormatter = d3.timeFormat("%Y");
            imageGroup.on("mouseover", function(gdpData) {
              toolTip.style("display", "block")
                  .html(
                    `<strong>Year:${dateFormatter(gdpData[10].Year)}<strong><hr>GDP:$${(gdpData[10].GDP)}
                <hr>Location:Chile`)
                  .style("left", d3.event.pageX + "px")
                  .style("top", d3.event.pageY + "px");
            })
            .on("mouseout", function() {
              toolTip.style("display", "none");
            });
          
            
        
          
          //    // append y axis
          chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left+20)
          .attr("x", 0 - (chartHeight / 2))
          .attr("dy", "1em")
          .classed("axis-text", true)
          .text("GDP ($)")
        
        
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
            .attr("cx", data => xTimeScale(data[10].Year))
            .attr("cy", data => yLinearScale(data[10].GDP));
          
            chartGroup.selectAll("image")
            .transition()
            .duration(1000)
            .attr("x", data => xTimeScale(data[10].Year))
            .attr("y", data => yLinearScale(data[10].GDP));
        })
    }else{
      d3.csv("./Data_Cleaning/GDP_csvs/GDP_CHL.csv").then(function(gdpData){
        console.log(gdpData)
        
        gdpData.forEach(function(data) {
        data.Year =  parseTime(data.Year)
        data.GDP = +data.GDP
        data.GDPgrowth = +data.GDPgrowth
        data.GDPpercapita = +data.GDPpercapita
        });
        
          var xTimeScale = d3.scaleTime()
          .range([0,chartWidth])
          .domain(d3.extent(gdpData, data=>data.Year))
        
          var yLinearScale =d3.scaleLinear()
            .range([chartHeight,0])
            .domain([0,d3.max(gdpData,data=>data.GDPpercapita)])
        
          
        
          var bottomAxis = d3.axisBottom(xTimeScale);
          var leftAxis = d3.axisLeft(yLinearScale)
        
          var drawLine = d3
          .line()
          .x(data => xTimeScale(data.Year))
          .y(data => yLinearScale(data.GDPpercapita));
        
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
        
            var toolTip = d3.select("body")
            .append("div")
            .classed("tooltip", true);
        
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`)
        
         labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "years") // value to grab for event listener
            .classed("active", true)
            .text("Years (2000-2019)");
        
            var circlesGroup = chartGroup.selectAll("circle")
            .data([gdpData])
            .enter()
            .append("circle")
            .attr("r", "4")
            .attr("fill", "black");
          
            // circlesGroup.on("mouseover", function(){
            //   d3.select(this)
            //     .transition()
            //     .duration(1000)
            //     .attr("r", 20)
            //     .attr("fill", "lightblue");
            // })
            var dateFormatter = d3.timeFormat("%Y");
        
            var imageGroup=chartGroup.selectAll("image")
            .data([gdpData])
            .enter()
            .append("image")
            .attr('xlink:href', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAABlCAMAAAB3G4FZAAAAhFBMVEXVKx7///8AOabqqafTDgAAJKDFy+QAOquMMnDcKgy7w+AAN6UANaUAK6IALqMAMaQAGp7f4vAYP6hfbLiRns7o6vQACZxIW7H5+v2QmswsSKsaPKeQlsoAEp3S2OsAAJiBkciyvN2fp9Lw8vhWZraCi8Zld72ortU/UK5xfb+HKWzOiZYX9koWAAABZUlEQVRoge2Y21KDMBRFoRrU5sJF7rTUFkWq//9/clEspD7wwsnYvd4yJzOsmZ2ck8HaLIU59gpY8IIXvOAFr9v24txILx4Uf4jReonnUJroJcPIM9Er9tNEmOclktTOrgdJ6iUz2/Zj87xiv63lV4Ok9OJFV9spU7wUG9jvulp5+F4qYi/14mwHor54HBZO5tJ6cZVd23NyOa3XhrMkmu+oXtlkItGce1dtpxucYnb6ie4j37+lF/XQmzcLsj7BgvKnGiX6kKTrX9745SrQHztkXiKvxnLtmuOlzr9lx6Acvf5GvvctP9KDpPLiQRdj7bGma2V6kFRebhtjKdumJQ7HdhRpQVJ5tbfxxIamxeoqlfMgqfoq9+tx8MimPM+DpPJq8ov3sxDaK5/s3E+C49qbFf8B4AUveMELXvAi83pYykpej0v5+LxbAetpMfdrYAEAAAAAAAAAAAAAAAAAAAAAwD/nC/ngOwaaD33NAAAAAElFTkSuQmCC')
            .attr('width', 30)
            .attr('height', 30)
        
            var dateFormatter = d3.timeFormat("%Y");
            imageGroup.on("mouseover", function(gdpData) {
              toolTip.style("display", "block")
                  .html(
                    `<strong>Year:${dateFormatter(gdpData[10].Year)}<strong><hr>GDP Per Capita:$${gdpData[10].GDPpercapita}<hr>Location:Chile`)
                  .style("left", d3.event.pageX + "px")
                  .style("top", d3.event.pageY + "px");
            })
            .on("mouseout", function() {
              toolTip.style("display", "none");
            });
          
            
        
          
          //    // append y axis
          chartGroup.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left+20)
          .attr("x", 0 - (chartHeight / 2))
          .attr("dy", "1em")
          .classed("axis-text", true)
          .text("GDP Per Capita ($)")
        
        
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
            .attr("cx", data => xTimeScale(data[10].Year))
            .attr("cy", data => yLinearScale(data[10].GDPpercapita));
          
            chartGroup.selectAll("image")
            .transition()
            .duration(1000)
            .attr("x", data => xTimeScale(data[10].Year))
            .attr("y", data => yLinearScale(data[10].GDPpercapita));
        })
    
    
    }
    
    }

    init()