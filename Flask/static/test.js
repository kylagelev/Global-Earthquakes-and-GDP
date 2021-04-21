var url = "/api/v1.0/get_quake"

d3.json(url).then(function(data) {
    console.log(data);
})