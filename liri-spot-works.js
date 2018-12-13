require("dotenv").config();

var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");
//var keys = require("keys");

var Spotify = require("node-spotify-api");

var questions = [
    {
        type: 'confirm',
        name: 'command',
        message: 'How can I help you?',
        default: false
    }
]

var spotify = new Spotify({
    id: "9990613d68f547fba782dbb4cebff479",
    secret: "9c97639854a14e54a567f65ec531fbea"
});




//var spotify = new Spotify(keys.spotify); //double check this line goes here

//************************** */

var spotifyThis = function () {

    spotify
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function (response) {
            //console.log(response.tracks.items.length);
            for (let i = 0; i < response.tracks.items.length; i++) {

                console.log("The song " + response.tracks.items[i].name); //song name
                console.log(" by " + response.tracks.items[i].album.artists[0].name); //artist name
                console.log(" from the album " + response.tracks.items[i].album.name); //album name
                console.log(" can be previewed here " + response.tracks.items[i].preview_url); //preview link
                
                console.log("---------------------------");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

spotifyThis();





