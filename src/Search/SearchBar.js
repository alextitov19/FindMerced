import { useState } from 'react';
import './SearchBar.css';
import SearchResultRow from './SearchResultRow.js'
var data = require("../test-data.json");

const SearchBar = () => {

    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
        setOffice(data.filter(item => {
            const searchTerm = event.target.value.toLowerCase();
            const building = item.building.toLowerCase();
            const room = item.room.toLowerCase();
            const nickname = item.nickname.toLowerCase();
            var flag = false
            if (building.startsWith(searchTerm)) {
                flag = true;
            }
            if (room.startsWith(searchTerm)) {
                flag = true;
            }
            if (nickname.startsWith(searchTerm)) {
                flag = true;
            }
            return searchTerm && flag;
        }));
    }

    const [offices, setOffice] = useState([]);

    return (<div className="search-container">
        <div className="search-inner">
            <input type='text' placeholder='Search...' value={value} onChange={onChange} />
            {/* <button className='search-button' onClick={() => onSearch(value)}> Search </button> */}
        </div>

        <div className='dropdown'>
            {
                offices.map(item => SearchResultRow(item))}
        </div>
    </div>);

}

export default SearchBar;