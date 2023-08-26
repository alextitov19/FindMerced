import { useState } from 'react';
import './SearchBar.css';
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
            <input type='text' value={value} onChange={onChange} />
            <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className='dropdown'>
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
                .map((item) => (<div class='dropdown-row'>
                    <div>{item.building}</div>
                    <div>{item.room}</div>
                    <div>{item.hours}</div>
                    <div>{item.days}</div>
                </div>))}
        </div>
    </div>);

}

export default SearchBar;