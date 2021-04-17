var myMap = L.map("map", {
    center: [30.7502, 30.7655],
    zoom: 3
  });
  
  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.csv('../quake_df.csv').then(function(response){
    console.log(response)

    console.log(response[0].Longitude)
    console.log(response[0].Latitude)

    var heatArray = []
    var magnitude = []
    var earthquakeMarkers = []

    //collecting heatmap data
    for (var i=0; i < response.length; i++){
        var location = response[i]
        
        if (location){
            heatArray.push([location.Longitude, location.Latitude, location.Magnitude]);
            magnitude.push(location.Magnitude)
        }
    }

    //setting up color for marker
    var myIcon = L.icon({
      iconUrl: 'red.png',
      iconSize: [38, 65],
      iconAnchor: [22, 64],
      popupAnchor: [-3, -76],
      shadowUrl: 'shadow.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
      });

    for (var i=0; i < 5; i++){
      earthquakeMarkers.push(
        L.marker([response[i].Longitude, response[i].Latitude], {icon: myIcon}).bindPopup("<h4>" + `Place: ` + "</h4>" + response[i].Place  +
                                                                          
                                                                          // "<h4>" + `Longitude: ` + "</h4>" + response[i].Longitude +
                                                                          
                                                                          // "<h4>" + `Latitude: ` + "</h4>" + response[i].Latitude +
                                                                           
                                                                          "<h4>" + `Magnitude: ` + "</h4>" + response[i].Magnitude +
                                                                          
                                                                          "<h4>" + `Date: ` + "</h4>" + response[i].Converted_Time_GMT )
      );
    }

    var earthquakeLayer = L.layerGroup(earthquakeMarkers);

    //checking values because have NaN value
    for (var i=0; i < magnitude.length; i++){
      if(typeof magnitude[i] === 'string'){
        console.log(magnitude.length)
    //need to convert values 
        magnitude[i] = +(magnitude[i])
      } 
    } 
    //checking if values were converted
    for (var i=0; i < magnitude.length; i++){
      if(typeof magnitude[i] === 'number'){
        console.log(magnitude.length)
      } 
    } 
 
    console.log(magnitude)
    //collecting minimum value in array
    min_mag = Math.min.apply(Math, magnitude)
    max_mag = Math.max.apply(Math, magnitude)
    console.log(min_mag)
    console.log(max_mag)

    for (var i=0; i < heatArray.length; i++){
      heatvalue = heatArray[i]
      for (var j=0; j < heatvalue.length; j++){
        heatvalue[j] = +heatvalue[j]
      }
    }

    //checking that heatmap values are numbers and not strings
    console.log(heatArray)

    var heat = L.heatLayer(heatArray,{
        radius: 15,
        blur: 20,
        max: 9.1,
        minOpacity: min_mag
    }).addTo(myMap)

    var earthquakes = {
      "Top5Earthquakes": earthquakeLayer,
    };


    //adding marker layer, indicating the top 5 by magnitude earthquakes
    L.control.layers(earthquakes).addTo(myMap);
    })
