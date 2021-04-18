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

var info = []
var values = {}
for (var i=0; i<files.length; i++){
  files[i].forEach(function(data){
  if (data.Year != '2020'){
  data.Year = +data.Year
  data.GDP = +data.GDP

  for (var j=0; j<8; j++){
      
  }
  }
  })
  values = {Year: +data.Year, GDP: +data.GDP}
  info.push([files[i].Year, files[i].GDP])


}
console.log(info)
console.log(values)
               })