import './App.css';
import SearchBar from './Search/SearchBar';
import Map from './Map/Map'
import { useState } from 'react';

function App() {

  const [lat, setLat] = useState(37.363577);
  const [lng, setLng] = useState(-120.424730);
  const [text, setText] = useState("Temp");

  function updateMarker(lat, lng, text) {
    setLat(lat);
    setLng(lng);
    setText(text);
    console.log("Set state")
  }

  return (
    <div className="App">
      <h1>Find Merced</h1>
      {SearchBar(updateMarker)}
      <Map
        mlat={lat}
        mlng={lng}
        mtext={text}
      />
    </div>
  );
}

export default App;
