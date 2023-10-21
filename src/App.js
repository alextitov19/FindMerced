import "./App.css";
import SearchBar from "./Search/SearchBar";
import Map from "./Map/Map";
import { useState } from "react";
import Chat from "./Chat/Chat";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  DistanceMatrixService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function App() {
  const google = window.google;

  const [map, setMap] = useState(<Map />);

  const [mylat, setLat] = useState(37.363577);
  const [mylng, setLng] = useState(-120.42473);

  function success(position) {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  }

  navigator.geolocation.getCurrentPosition(success, () => {});

  function updateMarker(lat, lng, name) {
    const image =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  
    var marker = (
      <MarkerF
        position={{ lat: lat, lng: lng }}
        label={name}
        icon={image}
      />
    );

    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: mylat, lng: mylng };
    const destination = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(`Success ${result}`);
          setMap(<Map marker={marker} directions={result} />);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  return (
    <div className="App">
      {Chat(updateMarker)}
      {map}
    </div>
  );
}

export default App;
