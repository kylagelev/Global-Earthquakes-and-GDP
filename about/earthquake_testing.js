// ATTEMPT WITH NODE.JS
// var http = require('https');

// function get_json(){
//   http.get_json(url,function(res){
//     var body ='';
//     res.on('data', function(chunk){
//       body += chunk;
//     })

//     res.on('end', function(){
//       var response = JSON.parse(body);
//       callback(response);
//     });
//   });
// }

// var quake_data = get_json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2000-01-01&minmagnitude=7", function(resp){
//   console.log(resp);
// });

  
// var button = d3.select("#filter-btn");
// var form = d3.select("#form");

// // Create event handlers
// button.on("click",runEnter);
// form.on("submit", runEnter);

function runEnter(){


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


 
  
  const url = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2000-01-01&minmagnitude=7"

  function unpack(rows, index){
    return rows.map(function(row){
      return row[index];
    })
  };

  d3.json(url).then(function(data){
    
    // var feature = unpack(data.features,0)
    // var time = feature.properties.time
    // // var lat = data.feaatures.geometry.coordinates[0]
    // // var lon = data.features.geometry.coordinates[1]
    // var magnitude = data.features.properties.mag

    var feature = data.features;
    var time = feature.map(d => d.properties.time);
    var mag = feature.map(d => d.properties.mag);
    var depth = feature.map(d => d.geometry.coordinates[2])

    var time = 


    //console.log(feature)
    // console.log(feature[0].properties.time)
    // console.log(data.features[0].properties.time)

    // for (var i = 0; i < feature.length; i++){
    //   time.append(feature[i].properties.time);
    //   console.log(feature[i].properties.time);
      
    // }
    console.log(data)
    console.log(typeof(time))
    

    //   // console.log(quakeData);
    //   // console.log(quakeData[0].Magnitude);
    //   // console.log(quakeData[0].Depth);
    //   // console.log(quakeData[0].Converted_Time_GMT);
  
    // var parseTime = d3.timeParse("%Y-%m-%d");
      
    
      // Sort quakeData by date
      // const sortedData = time.sort((a,b) => a-b)
  
  
  
      var xTimeScale = d3.scaleTime()
      .domain(d3.extent(feature, d => d.properties.time))
      .range([0,width]);
  
  
      var yLinearScale1 = d3.scaleLinear()
      .domain([6.8,d3.max(feature, d => d.properties.mag)])
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
      .x(d => xTimeScale(d.properties.time))
      .y(d => yLinearScale1(d.properties.map));
  
  
  
      // Append a path for line1
      // chartGroup.append("path")
      // .data([feature])
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
        .domain([d3.min(depth),d3.max(depth)])
        .range([0,30]);
  
    
  
    // Circle Markers
    var circleGroup = chartGroup.append('g')
      .selectAll("dot")
      .data(feature)
      .enter()
      .append("circle")
      .attr("class", function(d) { return "bubbles" + d.properties.mag} )
      .attr("cx", d => xTimeScale(d.properties.time))
      .attr("cy", d => yLinearScale1(d.properties.mag))
      .attr("r", d => z(d.geometry.coordinates[2]))
      .style("fill","gray");
  
      // Tool Tip
      var toolTip = d3.select("body")
        .append("div")
        .classed("tooltip",true);

      
      circleGroup.on("mouseover", function(feature){
        toolTip.style("display", "block")
            .html(
              `<hr>${(feature.properties.place)}<hr>Magnitude: ${(feature.properties.mag)}<hr>Depth: ${(feature.geometry.coordinates[2])}`)
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY + "px");
      })
          // Create "mouseout" event listener to hide tooltip
          .on("mouseout", function() {
            toolTip.style("display", "none");
          });
  
  }).catch(function(error){
      console.log(error);
  
  });
  
  }
  
  runEnter();
  
  // d3.select(window).on("resize",makeResponsive);