const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json({ extended: true }));

app.post('/search', async function(req, res) {

    
    let query = req.body.query;

    let response = await axios.get('http://api.tvmaze.com/search/shows?q=' + query);

    let data = response.data;

    let movies = [];

    for (let i in data) {
        movies.push({
            "id": data[i].show.id,
            "name": data[i].show.name,
            "type": data[i].show.type,
            "language": data[i].show.language,
            "genres": data[i].show.genres,
            "status": data[i].show.status,
            "runtime": data[i].show.runtime,
            "premiered": data[i].show.premiered,
            "officialSite": data[i].show.officialSite,
            "rating": data[i].show.rating,
            "image": data[i].show.image,
            "summary": data[i].show.summary
        });
        
    }
    
    res.send(movies);
});




app.listen(3000, function() {
    console.log("Up and running!");
});