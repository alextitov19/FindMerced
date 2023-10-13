import './App.css';
import SearchBar from './Search/SearchBar';
import Map from './Map/Map'
import { useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import Chat from './Chat/Chat';

function App() {

  const [map, setMap] = useState(<Map
  />);

  function updateMarker(text) {
    console.log(text)
    setMap(<Map
      destination={text}
    />)
  }

  return (
    <div className="App">
      {Chat(updateMarker)}
      {map}
    </div>
  );
}

export default App;
