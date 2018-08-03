import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Map from './components/Map';
import ListView from './components/ListView';
import scriptLoader from 'react-async-script-loader';
import { GOOGLE_API_KEY, LAT, LNG } from './API/keys';
import { googleStyle } from './API/googleStyle';
import { getDetails } from './API/FoursquareAPI';
import food from './assets/food.png';
import no_image from './assets/no_image.png';
import logo from './assets/logo.png';
import foursquare from './assets/foursquare.png';
import { locations } from './API/locations';



class App extends Component {
 

  constructor (props) {
    super(props);
    this.state = {
      searchTerm: '',
      locations: locations,
      filterString: '',
      isMenuOn: false,
      items: [],
      filteredLocations: locations,
      apiResponse: false,
      googleError: false,
      map: {},
      bounds: {}
    }
  }

  //Handle the google map error
   gm_authFailure = () => {
        this.setState({googleError: true});
   }


  //Detect if has google map error
  componentDidMount () {
    window.gm_authFailure = this.gm_authFailure;
  };

  //Filter query
  updateQuery = event => {

    const { locations } = this.state;
    //Get query string form input
    const query = event.target.value.toLowerCase();

    //Add query to searchTerm and filterString
    this.setState({
      searchTerm: query,
      filterString: query
    });

    //Filter locations
    const result = locations.filter((locations) => {
      const filtered = locations.title.toLowerCase().indexOf(query) > -1;
        locations.marker.setVisible(filtered);
      return filtered;
    });
    //Set result to locations
    this.setState({filteredLocations: result });
  };


  //Initialise the map once the google map script is loaded
  componentWillReceiveProps({
    isScriptLoadSucceed
  }) {
    if (isScriptLoadSucceed) {

      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
          lat: LAT,
          lng: LNG
        },
        styles: googleStyle
      });
      
      let bounds = new window.google.maps.LatLngBounds();
      let infowindow = new window.google.maps.InfoWindow({});

      this.setState({googleError: false });
        

      locations.forEach((location) => {
        location.marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.title,
          icon: food,
          lat: location.position.lat,
          lng: location.position.lng
        });

        bounds.extend(location.position);
        location.marker.addListener('click', function () {

        //Add animation to marker
        location.marker.setAnimation(window.google.maps.Animation.BOUNCE);

        //Stop animation
        setTimeout(function() {
          location.marker.setAnimation(null);
        }, 1000);
        
        // Retrive the location data from the foursquare api for the marker and display it in the infowindow
        getDetails(location.marker.lat, location.marker.lng, location.marker.title).then(data => {
          const location_info = data.response.venues[0];
          const location_name = (location_info.name) ? location_info.name : location.marker.title;
          const address       = (location_info.location.formattedAddress) ? (`${location_info.location.formattedAddress[0]}</br>${location_info.location.formattedAddress[1]}</br>${location_info.location.formattedAddress[2]}`) : '';
          const url           = (location_info.url) ? location_info.url : `https://foursquare.com/v/${location_info.id}`;
          const category      = (location_info.categories[0].name) ? location_info.categories[0].name : '';
          const img           = (location_info.categories[0].icon) ? `${location_info.categories[0].icon.prefix}88${location_info.categories[0].icon.suffix}` : no_image;
                    
          
          // Set up InfoWindow content
            location.marker.infoContent = location.marker.infoContent = `<div id="iw-container">
            <div class="iw-title">${location_name}</div>
            <div class="iw-content">
                <div class="iw-subTitle">${category}</div>
                <div class="post-container">                
                    <div class="post-thumb">
                        <img class="img-thumbnail" src="${img}" alt=${location_name} height="115" width="83">
                    </div>
                    <div class="post-content">
                        <h3 class="post-title">Contacts</h3>
                        <p>Adress: ${address}<br>              
                   </div>
                 <p><a href="${url}" class="btn btn-primary btn-xs" role="button" title="${location_name}" aria-label="View More">View More</a>
                </div>             
            </div>
            <div class="iw-bottom-gradient"></div>
          </div>`;

          infowindow.setContent(location.marker.infoContent);
          infowindow.open(map, location.marker);

          setTimeout(function() {
              infowindow.close();
          }, 10000);

        }).catch(error => { location.marker.infoContent =
          `<div className="alert" role="alert">
              <h4>The request for <strong> ${location.marker.title} </strong> failed. Try again later!</h4>
          </div>`;
          //Loading infoWindow with message that have
          //a problem with connection with Foursquare
          infowindow.setContent(location.marker.infoContent);
          infowindow.open(map, location.marker);
          setTimeout(function() {
              infowindow.close();
          }, 4000);

        });
      })
    })
    map.fitBounds(bounds);
    } else {
      this.setState({
        googleError: true
      });
    }
  }

  render() {

    const {filterString, filteredLocations, apiResponse, googleError} = this.state;

        return (
            <Row className="show-grid" bsClass="main" role="main" tabIndex="1">
              <div className={this.state.isMenuOn ? "row row-offcanvas row-offcanvas-left active" : " row row-offcanvas row-offcanvas-left"}>
                <aside className="col-sm-2 col-xs-12 sidebar-offcanvas" id="sidebar" tabIndex="2">
                  <div className="logo text-center">
                    <img src={logo} alt="Sofia Tour Guide" />
                    <p>Powered by </p>
                    <a href="https://foursquare.com" aria-label="Vists Foursquare"><img src={foursquare} className="img-responsive" alt="Foursquare" /></a>          
                  </div>
                  <div>
                    <div className="input-group">
                      <input type="text" className="form-control"
                             placeholder="Search for..."
                             value={ this.query }
                             onKeyUp={ this.updateQuery }
                             tabIndex={ apiResponse ? '0' : '-1' }
                      />
                    </div>
            
                    
                    {filteredLocations.length > 0 && !googleError ?
                        <ListView
                            locations = {filteredLocations}
                            filterString = {filterString}
                            apiResponse = {apiResponse}

                        />
                         :
                        <div className="alert" role="alert">
                          {googleError ? <p>There is a problem with the Google Map API connection</p> : <p>No results.</p>}
                        </div>
                    }
                    
                  </div>
                </aside>
                  <main className="col-sm-10 col-xs-12 main-content-area" role="main" tabIndex={ !googleError ? '0' : '-1' }>
                    <p className="pull-left visible-xs js-toogle-button">
                      <button type="button" onClick={()=> this.setState({isMenuOn: !this.state.isMenuOn})}>
                        <div></div>
                        <div></div>
                        <div></div>
                      </button>
                    </p>
                      {googleError ?
                          <div className="container">
                            <div className="col-xs-12 col-md-3 col-md-offset-5 text-center">
                              <div className="loading">
                                  <div className="loading">
                                      <h3>There is a problem with the Google Map API connection. Please check your Internet connection.</h3>
                                  </div>
                              </div>
                            </div>
                          </div>
                          :
                          <Map />
                      }

                  </main>
              </div>
            </Row>
        );
    }
}
export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`]
)(App);