function buildPlot() {

Promise.all([d3.csv("../Data/GDP_IDN.csv"), 
             d3.csv("../Data/GDP_BRA.csv"),
             d3.csv("../Data/GDP_CHN.csv"),
             d3.csv("../Data/GDP_GBR.csv"),
             d3.csv("../Data/GDP_IND.csv"),
             d3.csv("../Data/GDP_RUS.csv"),
             d3.csv("../Data/GDP_USA.csv")]).then(function(files){

//collecting data for lines from csv files

//IDN
IDN_Y = []
IDN_G = []
files[0].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP
    
    IDN_Y.push(data.Year)
    IDN_G.push(data.GDP)
    }
})
console.log(IDN_G)

//BRA
BRA_Y = []
BRA_G = []
files[1].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      BRA_Y.push(data.Year)
      BRA_G.push(data.GDP)
    }
})
console.log(BRA_G)

//CHN
CHN_Y = []
CHN_G = []
files[2].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      CHN_Y.push(data.Year)
      CHN_G.push(data.GDP)

    }
})

//GBR
GBR_Y = []
GBR_G = []
files[3].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      GBR_Y.push(data.Year)
      GBR_G.push(data.GDP)
    }
})

//IND
IND_Y = []
IND_G = []
files[4].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      IND_Y.push(data.Year)
      IND_G.push(data.GDP)
    }
})

//RUS
RUS_Y = []
RUS_G = []
files[5].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      RUS_Y.push(data.Year)
      RUS_G.push(data.GDP)
    }
})

//USA
USA_Y = []
USA_G = []
files[6].forEach(function(data){
    if (data.Year != '2020'){
      data.Year = +data.Year
      data.GDP = +data.GDP

      USA_Y.push(data.Year)
      USA_G.push(data.GDP)
    }
})

var IDN = {
    type: 'scatter',
    mode: 'lines',
    name: 'IDN',
    x: IDN_Y,
    y: IDN_G,
    color: 'red'
  }

var BRA = {
    type: 'scatter',
    mode: 'lines',
    name: 'BRA',
    x: BRA_Y,
    y: BRA_G
  }

var CHN = {
    type: 'scatter',
    mode: 'lines',
    name: 'CHN',
    x: CHN_Y,
    y: CHN_G
  }

var GBR = {
    type: 'scatter',
    mode: 'lines',
    name: 'GBR',
    x: GBR_Y,
    y: GBR_G
  }

var IND = {
    type: 'scatter',
    mode: 'lines',
    name: 'IND',
    x: IND_Y,
    y: IND_G
  }

var RUS = {
    type: 'scatter',
    mode: 'lines',
    name: 'RUS',
    x: RUS_Y,
    y: RUS_G
  }

var USA = {
    type: 'scatter',
    mode: 'lines',
    name: 'USA',
    x: USA_Y,
    y: USA_G
  }

  var data = [IDN, BRA, CHN, GBR, IND, RUS, USA]

  var layout = {
    title: `GDP Across Major 7 Countries + Indonesia`,
    xaxis: {
      range: [IDN_Y[0], IDN_Y[20]],
      type: 'date'
    },
    yaxis: {
      autorange: true,
      type: 'linear'
    },
    shapes: [
      // 1st highlight during Feb 4 - Feb 6
      {
          type: 'rect',
          // x-reference is assigned to the x-values
          xref: 'x',
          // y-reference is assigned to the plot paper [0,1]
          yref: 'paper',
          x0: '2002',
          y0: 0,
          x1: '2007',
          y1: 1,
          fillcolor: 'grey',
          opacity: 0.2,
          line: {
              width: 0
          }
        },
        {
          type: 'rect',
          // x-reference is assigned to the x-values
          xref: 'x',
          // y-reference is assigned to the plot paper [0,1]
          yref: 'paper',
          x0: '2004',
          y0: 0,
          x1: '2006',
          y1: 1,
          fillcolor: 'red',
          opacity: 0.2,
          line: {
              width: 0
          }
        },

          {
              type: 'rect',
              // x-reference is assigned to the x-values
              xref: 'x',
              // y-reference is assigned to the plot paper [0,1]
              yref: 'paper',
              x0: '2010',
              y0: 0,
              x1: '2014',
              y1: 1,
              fillcolor: 'grey',
              opacity: 0.2,
              line: {
                  width: 0
              }
            },
            {
              type: 'rect',
              // x-reference is assigned to the x-values
              xref: 'x',
              // y-reference is assigned to the plot paper [0,1]
              yref: 'paper',
              x0: '2012',
              y0: 0,
              x1: '2013',
              y1: 1,
              fillcolor: 'red',
              opacity: 0.2,
              line: {
                  width: 0
              }
              // mode: 'text',
              // text: 'Earthquake (04-11-2012)'
            },
          ]
        
  }

  Plotly.newPlot('plot', data, layout)



             })

            }

            buildPlot();