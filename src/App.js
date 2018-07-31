import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Map from './components/Map';
import ListView from './components/ListView';
import scriptLoader from 'react-async-script-loader';
import { GOOGLE_API_KEY, LAT, LNG } from './API/keys';
import { googleStyle } from './API/googleStyle';
import { getAll, getDetails } from './API/FoursquareAPI';
import museum from './assets/museum.png';
import no_image from './assets/no_image.png';
import logo from './assets/logo.png';
import foursquare from './assets/foursquare.png';


class App extends Component {

  constructor (props) {
    super(props);
    this.state = {
      searchTerm: '',
      locations: [],
      filterString: '',
      isMenuOn: false,
      items: [],
      filteredLocations: [],
      googleError: true
    }
  }

  //Get API data from Foursquare
  componentDidMount () {
    const data = [];
    getAll().then( places => {
      places.forEach(function(item) {
        data.push({
          title: item.name,
          position: {
            lat: item.location.lat,
            lng: item.location.lng
          },
          id: item.id
        });
      });
      //Check if data from foursquare and set state
      if (data && data.length){
         this.setState({
            locations: data,
            filteredLocations: data,
            apiResponse: true
          });
      } else {
            this.setState({apiResponse: false})
      }
     });
  }

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


  //used componentWillReceiveProps to “reset” some state when a prop changes
  componentWillReceiveProps({isScriptLoadSucceed}){
    if (isScriptLoadSucceed) {

      //Set up google center map
      let map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {lat: LAT, lng: LNG},
        styles: googleStyle
      });

      // set up bounds and infoWindow
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({maxWidth: 350});

      this.setState({
          googleError: false
      });

      //Add google marker and event click listener for each location
      this.state.locations.forEach( (location) =>  {
        location.marker = new window.google.maps.Marker({
          position: location.position,
          map: map,
          title: location.title,
          id: location.id,
          icon: museum
        });
        bounds.extend(location.position);

        location.marker.addListener('click', function() {

            //Add animation to marker
            location.marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(function() {
              location.marker.setAnimation(null);
            }, 1000);

            getDetails(location.marker.id).then(data => {

              const name     = (data.response.venue.name) ? data.response.venue.name : "";
              const address  = (data.response.venue.location.address) ? data.response.venue.location.address : '';
              const url      = (data.response.venue.canonicalUrl) ? data.response.venue.canonicalUrl : "https://foursquare.com";
              const subtitle = (data.response.venue.categories > 0) ? data.response.venue.categories[0].name : '';
              const img      = (data.response.venue.bestPhoto) ? `${data.response.venue.bestPhoto.prefix}400x400${data.response.venue.bestPhoto.suffix}` : no_image;
              const phone    = (data.response.venue.formattedPhone) ? data.response.venue.formattedPhone : "No available"


              // Set up InfoWindow content
               location.marker.infoContent = `<div id="iw-container">
                      <div class="iw-title">${name}</div>
                      <div class="iw-content">
                          <div class="iw-subTitle">${subtitle}</div>
                          <div class="post-container">                
                              <div class="post-thumb">
                                  <img class="img-thumbnail" src="${img}" alt=${name} height="115" width="83">
                              </div>
                              <div class="post-content">
                                  <h3 class="post-title">Contacts</h3>
                                  <p>Adress: ${address}<br>
                                  <p>Phone: ${phone}</p>
                             </div>
                           <p><a href="${url}" class="btn btn-primary btn-xs" role="button" aria-label="View More">View More</a>
                          </div>             
                      </div>
                      <div class="iw-bottom-gradient"></div>
                    </div>`;

              infowindow.setContent(location.marker.infoContent);
              infowindow.open(map, location.marker);

            }).catch(error => { location.marker.infoContent =
                              `<div className="alert" role="alert">
                                  <h4>Foursquare details request for ${location.marker.title} failed</h4>
                              </div>`;
                              //Loading infoWindow with message that have
                              //a problem with connection with Foursquare
                              infowindow.setContent(location.marker.infoContent);
                              infowindow.open(map, location.marker);
                              setTimeout(function() {
                                  infowindow.close();
                              }, 4000);

            });
        });
      });
      map.fitBounds(bounds);
    }
  }

  render() {


    const {filterString, filteredLocations, apiResponse, googleError} = this.state;
         
        return (
            <Row className="show-grid" bsClass="main" role="main">
              <div className={this.state.isMenuOn ? "row row-offcanvas row-offcanvas-left active" : " row row-offcanvas row-offcanvas-left"}>
                <aside className="col-sm-2 col-xs-12 sidebar-offcanvas" id="sidebar">
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
                      />
                    </div>
            
                    {!apiResponse ? 
                        <div className="alert" role="alert">
                          <p>Sorry. There is a some problem with data from Foursquare.</p>
                        </div> :
                        ""
                    }                    
                                        
                    {filteredLocations.length > 0 ?
                        <ListView locations = {filteredLocations} filterString = {filterString} />
                         :                            
                        <div className="alert" role="alert">
                          <p>No results.</p>
                        </div>
                    }
                    
                  </div>
                </aside>
                  <main className="col-sm-10 col-xs-12 main-content-area" role="main">
                    <p className="pull-left visible-xs js-toogle-button">
                      <button type="button" onClick={()=> this.setState({isMenuOn: !this.state.isMenuOn})}>
                        <div></div>
                        <div></div>
                        <div></div>
                      </button>
                    </p>
                    <Map errorGoogle = {googleError} />
                  </main>
              </div>
            </Row>
        );
    }
}
export default scriptLoader(
    [`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`]
)(App);