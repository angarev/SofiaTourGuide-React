import React, { Component } from 'react';


class ListView extends Component{

   // Trigger the onclick event of a marker
  showInfoWindow = (location) => {
    window.google.maps.event.trigger(location.marker,'click');
  }

  render() {
    const { locations, filterString, apiResponse } = this.props;
    return (
        <div  role="complementary"  tabIndex= "-1">
          <ul className="list-group"  role="navigation">
            {locations.filter(location =>
                location.title.toLocaleLowerCase().includes(
                    filterString.toLocaleLowerCase()
                )
            ).map((location, id) =>
                <li key={id}
                    className="list-group-item"
                    onClick={this.showInfoWindow.bind(this, location)}
                    tabIndex={ apiResponse ? '0' : '-1' }
                >
                  {location.title}
                </li>
            )}
          </ul>
        </div>
    );
  }
}

export default ListView;