function buildPlot() {

    Promise.all([d3.json("/api/v1.0/get_GDP_CHL"), 
                 d3.json("/api/v1.0/get_GDP_BRA"),
                 d3.json("/api/v1.0/get_GDP_CHN"),
                 d3.json("/api/v1.0/get_GDP_GBR"),
                 d3.json("/api/v1.0/get_GDP_IND"),
                 d3.json("/api/v1.0/get_GDP_RUS"),
                 d3.json("/api/v1.0/get_GDP_USA")]).then(function(files){
    
    //collecting data for lines from json files
    
    //CHL
    CHL_Y = []
    CHL_G = []
    files[0].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
        
        CHL_Y.push(data[0])
        CHL_G.push(data[2])
        }
    })
    console.log(CHL_G)
    
    //BRA
    BRA_Y = []
    BRA_G = []
    files[1].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          BRA_Y.push(data[0])
          BRA_G.push(data[2])
        }
    })
    console.log(BRA_G)
    
    //CHN
    CHN_Y = []
    CHN_G = []
    files[2].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          CHN_Y.push(data[0])
          CHN_G.push(data[2])
    
        }
    })
    
    //GBR
    GBR_Y = []
    GBR_G = []
    files[3].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          GBR_Y.push(data[0])
          GBR_G.push(data[2])
        }
    })
    
    //IND
    IND_Y = []
    IND_G = []
    files[4].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          IND_Y.push(data[0])
          IND_G.push(data[2])
        }
    })
    
    //RUS
    RUS_Y = []
    RUS_G = []
    files[5].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          RUS_Y.push(data[0])
          RUS_G.push(data[2])
        }
    })
    
    //USA
    USA_Y = []
    USA_G = []
    files[6].forEach(function(data){
        if (data[0] != '2020'){
          data[0] = +data[0]
          data[2] = +data[2]
    
          USA_Y.push(data[0])
          USA_G.push(data[2])
        }
    })
    
    var CHL = {
        type: 'scatter',
        mode: 'lines',
        name: 'CHL',
        x: CHL_Y,
        y: CHL_G,
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
    
      var data = [CHL, BRA, CHN, GBR, IND, RUS, USA]
    
      var layout = {
        title: `GDP Across Major 7 Countries + Chile`,
        xaxis: {
          range: [CHL_Y[0], CHL_Y[20]],
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
              x0: '2009',
              y0: 0,
              x1: '2012',
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
              x0: '2010',
              y0: 0,
              x1: '2011',
              y1: 1,
              fillcolor: 'red',
              opacity: 0.2,
              line: {
                  width: 0
              }
            },
   
              ]
            
      }
    
      Plotly.newPlot('plot', data, layout)
    
    
    
                 })
    
                }
    
                buildPlot();