# LIRI

LIRI is a command-line Language Interpretation and Recognition Interface.  LIRI searches Spotify for songs, Bands in Town for concerts, and OMDB for movies with the use of APIs.  It is made using Javascript and the following Node Packages - Inquirer, Node-Spotify-API, Moment, DotEnv and Request.

From LIRI's menu select what you would like to search and then enter the appropriate search term(s) as directed.

Here are some sample screen shots...

  ### Main Menu 
  ![Image of Main Menu](https://klbjklbj.github.io/liri-node-app/images/menu.png)
    
  ### Concert This
  ![Image of Concert This](https://klbjklbj.github.io/liri-node-app/images/concertThis.png)  
  
  ### Spotify This 
  ![Image of Spotify This](https://klbjklbj.github.io/liri-node-app/images/spotifyThis.png)
  
  ### Movie This
  ![Image of Movie This](https://klbjklbj.github.io/liri-node-app/images/movieThis.png)
  
  ### Do What it Says 
  ![Image of Do What it Says](https://klbjklbj.github.io/liri-node-app/images/doWhatItSays.png)
  

## To Install LIRI

Clone this repo to your local directory.

Go to your repo in your command terminal, and enter *npm install* to makes sure you have the required NPM packages to run this app.

The Spotify id is kept secret in a .env file. This file will be used by the dotenv package to set environment variables to the global process.env object in node. You will need to have your own Spotify id in your own .env file for this app to work on your machine. The dotenv package and documentation can be found here...https://www.npmjs.com/package/dotenv .
  
  
