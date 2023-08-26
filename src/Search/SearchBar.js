import { useState } from 'react';
import './SearchBar.css';
import SearchResultRow from './SearchResultRow.js'
var data = require("../test-data.json");

const SearchBar = () => {

    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const onSearch = (searchTerm) => {
        console.log('search ', searchTerm);
    }

    return (<div className="search-container">
        <div className="search-inner">
            <input type='text' placeholder='Search...' value={value} onChange={onChange} />
            {/* <button className='search-button' onClick={() => onSearch(value)}> Search </button> */}
        </div>

        <div className='dropdown'>
            {/* <div className='dropdown-header'>
                <div className='nickname'>Nickname</div>
                <div className='location'>Location</div>
                <div className='hours'>Hours</div>
                <div className='days'>Days</div>
            </div> */}
            {data.filter(item => {
                const searchTerm = value.toLowerCase();
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
            })
                .map(item => SearchResultRow(item))}
        </div>
    </div>);

}

export default SearchBar;