import React from 'react';

class Map extends React.Component {
    render() {
        return (
            <iframe
                width="850"
                // height="450"
                frameBorder="0"
                src="https://www.google.com/maps/embed/v1/place?&q=New%20York&zoom=13&key=AIzaSyCkiUHqV065uCy4s1koyM6xjMXFBCnnoCk" />

        );
    }
}

export default Map;
