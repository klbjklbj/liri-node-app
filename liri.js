require("dotenv").config();

const keys = require("./keys")

var inquirer = require("inquirer");
var request = require("request");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var Spotify = require("node-spotify-api");

// let spotify = new Spotify({
//     id: "9990613d68f547fba782dbb4cebff479",
//     secret: "9c97639854a14e54a567f65ec531fbea"
// });

let spotify = new Spotify(keys.spotify);

var commandChoice = function () {

    inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'What would you like to do',
            choices: ['concertThis', 'spotifyThis', 'movieThis', 'doWhatItSays'],
        }
    ])

        .then(function (answers) {
            if (answers.command === 'concertThis') {
                console.log("concertThis");
                concertThis();
            }
            else if (answers.command === 'spotifyThis') {
                console.log("spotifyThis");
                spotifyThis();
            }
            else if (answers.command === 'movieThis') {
                console.log("movieThis");
                movieThis();
            }
            else if (answers.command === 'doWhatItSays') {
                console.log("doWhatItSays");
                doWhatItSays();
            }
        })
}

//*****************************AXIOS VERSION*****************************/
// var concertThisAxios = function () {
//     inquirer.prompt([
//         {
//             type: "input",
//             name: "artistTitle",
//             message: "For which artist are you searching?"
//         }
//     ]).then(function (answers) {
//         var artist = answers.artistTitle;
//         axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
//             function (response) {
//                 for (let i = 0; i < response.data.length; i++) {
//                     console.log(artist + " will be playing at " + response.data[i].venue.name + " in " + response.data[i].venue.city + " on " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
//                 }
//             }
//         )
//     }
//     )
// }
//***********************************************************************/

var spotifyThis = function () {

    inquirer.prompt([
        {
            type: "input",
            name: "song",
            message: "For which song are you searching?"
        }
    ]).then(function (answers) {

        let song = answers.song;

        spotify
            .search({ type: 'track', query: song })
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
    });
}

var concertThis = function () { //Bandsintownrequest -works

    inquirer.prompt([
        {
            type: "input",
            name: "artistTitle",
            message: "For which artist are you searching?"
        }
    ]).then(function (answers) {
        var artist = answers.artistTitle;
        request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', function (error, response, body) {
            // console.log('error:', error); // Print the error or null

            // if (!error && response.statusCode == 200) {   *****Error checking
            //     var info = JSON.parse(body)
            //   }

            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

            let data = JSON.parse(body);
            //console.log(data);

            for (let i = 0; i < data.length; i++) {
                console.log(artist + " will be playing at " + data[i].venue.name + " in " + data[i].venue.city + " on " + moment(data[i].datetime).format('MM/DD/YYYY'));
            }
        });
    });
}

var movieThis = function () {

    inquirer.prompt([
        {
            type: "input",
            name: "movieTitle",
            message: "For which movie are you searching?"
        }
    ]).then(function (answers) {

        let title;

        if (answers.movieTitle != "") {
            title = answers.movieTitle;
        }
        else {
            //console.log("Mr. Nobody");
            title = "Mr.Nobody";
            console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix");
        }

        request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=2cea0522", function (error, response, body) {

            let data = JSON.parse(body);

            console.log("The movie's title is: " + data.Title);
            console.log("The movie's release year is: " + data.Year);
            console.log("The movie's imdb rating is: " + data.imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + data.Ratings[1].Value);//need error handling if no Tomatoes Rating available
            console.log("The movie was produced in: " + data.Country);
            console.log("The movie's language is: " + data.Language);
            console.log("The movie's plot is: " + data.Plot);
            console.log("The movie's actors are: " + data.Actors);
        });

    });
}
    //******************AXIOS VERSION OMBD***************************************
    // axios.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy").then(
    //     function (response) {
    // print out the response

    // console.log("The movie's title is: " + response.data.Title);
    // console.log("The movie's release year is: " + response.data.Year);
    // console.log("The movie's imdb rating is: " + response.data.imdbRating);
    // console.log("The movie's Rotten Tomatoes rating is: " + response.data.Ratings[1].Value); //error if no Tomatoes Rating available
    // console.log("The movie was produced in: " + response.data.Country);
    // console.log("The movie's language is: " + response.data.Language);
    // console.log("The movie's plot is: " + response.data.Plot);
    // console.log("The movie's actors are: " + response.data.Actors);
    // }


var doWhatItSays = function () {
    fs = require('fs')
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var doThis = data.split(",");
        // console.log(data);
        // console.log(doThis);
        // console.log(doThis.length);
        var searchThis = doThis[0];
        var song = doThis[1];
        if (searchThis === "spotify-this-song") {

            var spotifyThis = function () {
                //var searchThis = doThis[0];
                var song = doThis[1];
                //console.log(song);
                spotify
                    .search({ type: 'track', query: song })
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
        }
    });

}

commandChoice();