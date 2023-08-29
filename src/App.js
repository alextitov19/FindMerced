import './App.css';
import SearchBar from './Search/SearchBar';
import Map from './Map/Map'
import { useState } from 'react';
import { MarkerF } from '@react-google-maps/api';

function App() {

  const [map, setMap] = useState(<Map
  />);

  function updateMarker(lat, lng, text) {
    console.log(text)
    const myMarker = <MarkerF position={{ lat: lat, lng: lng }} />
    setMap(<Map
      marker={myMarker}
      lat={lat}
      lng={lng}
    />)
  }

  return (
    <div className="App">
      <h1>CatLynx</h1>
      {SearchBar(updateMarker)}
      {map}
    </div>
  );
}

export default App;
