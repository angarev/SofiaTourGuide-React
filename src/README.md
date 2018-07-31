# Sofia Tour Guide
***

This app is the latest project from Udacity's Front-End Web Developer Nanodegree program. Sofia Tour Guide is an application that builds my application with the same name I created a few years ago. It is written on java and has more than 2000 downloads from Google Play Store -  [Sofia Tour Guide](https://play.google.com/store/apps/details?id=com.sofiatourguide.sofiatourguide&hl=bg). Udacity's Front-End Web Developer The Nanodegree program gave me a chance to develop a React-based web application. Sofia Tour Guide is designed for tourists coming to Sofia who want to get acquainted with Bulgarian history. I used the Google map API and the Foursquare API to create the app. Google map creates the map, and Foursquare shows the places that foreign tourists could visit. When loading the app in the sidebar of the page you will see a list of museums in the center of Sofia. If you click on any of the names of some of the museums, you will have an info window on the map showing the museum data that Foursquare has.


### Prerequisites 

The project uses Node.js and the Create React App starter.  
If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/). 
You also need to have working API keys from the Google map API and the Foursquare API. 
You can get it here: [Google Map API](https://cloud.google.com/maps-platform/), [Foursquare API](https://developer.foursquare.com/).
 

### Installing


Once Node.js is installed, clone the repository 
```
git clone https://github.com/angarev/SofiaTourGuide-React.git
```

Navigate to the root directory of the app and install all dependencies.

```
npm install
```

Once all of the dependencies have been installed you must enter your Google Map and Foursquare keys. 
 Enter in API directory in root directory and open key.js file. Fill your keys.
 Now you can launch the app. Execute the follow command in your root directory.  
 
```
npm start
```

A new browser window should automatically open displaying the app.  If it doesn't, navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

The app uses service workers.
***NOTE:*** *The service workers for this app will only cache the site when it is in production mode.*.

### How to use the App


Once the app is launched, you will see a list of the most interesting museums in downtown Sofia, which are visited by foreign tourists and are available in the Foursquare database. 
You can filter names through the Input field beneath the application logo. 
If you click on a name, you will see an info window that will see a piece of information available to Foursquare.
The app is mobile friendly.


### Resources used


* [Udacity Project Rubric](https://review.udacity.com/#!/rubrics/1351/view)
* [Udacity CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
* [Udacity HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
* [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
* [Udacity course - Designing RESTful APIs](https://classroom.udacity.com/courses/ud388)
* [Create-react-app](https://github.com/facebookincubator/create-react-app)
* [React API](https://facebook.github.io/react/docs/react-api.html)
* [React-async-script-loader](https://github.com/leozdgao/react-async-script-loader)
* [Google Map API](https://cloud.google.com/maps-platform/)
* [Foursquare API](https://developer.foursquare.com/)
* [Fetching API Data with React.JS](https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2)
* [Map style](https://snazzymaps.com/style/20/gowalla)
* [Info window style](http://en.marnoto.com/2014/09/5-formas-de-personalizar-infowindow.html)
* [Bootstrap 3](https://getbootstrap.com/docs/3.3/)
* [React-Bootstrap](https://react-bootstrap.github.io)
* [SVG-Loaders by Sam Herber](https://github.com/SamHerbert/SVG-Loaders)
* [Museum icon](https://icons8.com/icon/89482/museum)
* [No image available](http://amnesia.wikia.com/wiki/File:No-image-available-hi.png)


###  Terms & Conditions

This project is licensed under the terms of the MIT license.













