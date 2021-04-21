var url = 'http://127.0.0.1:5000/api/v1.0/get_quake'

d3.json(url).then(function(data) {
    console.log(data);
})