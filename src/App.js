import { useState } from 'react';
import './App.css';
var data = require("./test-data.json");

function App() {

  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSearch = (searchTerm) => {
    console.log('search ', searchTerm);
  }

  return (
    <div className="App">
        <h1>Find Merced</h1>
      <div className="search-container">
        <div className="search-inner">
        <input type='text' value={value} onChange={onChange} />
        <button onClick={ () => onSearch(value) }> Search </button>
        </div>
        <div className='dropdown'>
          {data.filter(item => {
            const searchTerm = value.toLowerCase();
            const building = item.building.toLowerCase();
            const room = item.room.toLowerCase();
            const resultString = building + room;
            return searchTerm && resultString.startsWith(searchTerm);
          })
          .map((item) => (<div class='dropdown-row'>
            <div>{item.building}</div>
            <div>{item.room}</div>
            <div>{item.hours}</div>
            <div>{item.days}</div>
            </div>))}
        </div>
      </div>
    </div>
  );
}

export default App;
