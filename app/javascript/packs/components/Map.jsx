import React from 'react';

class Map extends React.Component {
    render() {
        return (
            <iframe
                width="850"
                height="850"
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?&q=New%20York&zoom=13&key=AIzaSyBvZdXEk7Oo1fw0Tc9fm0CSQNtfIGTny6I" />

        );
    }
}

export default Map;
