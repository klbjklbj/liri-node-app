require("dotenv").config();

var inquirer = require("inquirer");
var axios = require("axios");
var moment = require("moment");

var title;

var spotify = new Spotify(keys.spotify); //double check this line goes here


// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

function concertThis() {

    inquirer.prompt([
        {
            type: "input",
            name: "artistTitle",
            message: "For which artist are you searching?"
        }
    ]).then(function (answers) {
        var artist = answers.artistTitle;

        axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
            function (response) {

                for (let i = 0; i < response.data.length; i++) {

                    console.log(artist + " will be playing at " + response.data[i].venue.name + " in " + response.data[i].venue.city + " on " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
                }
            }
        )
    }
    )
}

//concertThis();

var movieThis = function () {

    inquirer.prompt([
        {
            type: "input",
            name: "movieTitle",
            message: "For which movie are you searching?"
        }
    ]).then(function (answers) {
        var title = answers.movieTitle;

        axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // print out the response
                console.log("The movie's title is: " + response.data.Title);
                console.log("The movie's release year is: " + response.data.Year);
                console.log("The movie's imdb rating is: " + response.data.imdbRating);
                console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value);
                console.log("The movie was produced in: " + response.data.Country);
                console.log("The movie's language is: " + response.data.Language);
                console.log("The movie's plot is: " + response.data.Plot);
                console.log("The movie's actors are: " + response.data.Actors);
            }
        );

    })

}

//movieThis();


