import './App.css';
import SearchBar from './Search/SearchBar';
import Map from './Map/Map'

function App() {

  return (
    <div className="App">
      <h1>Find Merced</h1>
      <SearchBar />
      <Map
        mlat={37.363577}
        mlng={-120.424730}
      />
    </div>
  );
}

export default App;
