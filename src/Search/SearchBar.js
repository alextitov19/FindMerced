import { useState } from 'react';
import './SearchBar.css';
import SearchResultRow from './SearchResultRow.js'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

var data = require("../test-data.json");

const SearchBar = (updateMarker) => {

    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
        filterData(event.target.value);
    }

    const filterData = (s) => {
        setOffice(data.filter(item => {
            const searchTerm = s.toLowerCase();
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

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        console.log("Browser doesn't support speech recognition.");
    }

    function onClickRow(office) {
        setValue(office.nickname);
        filterData(office.nickname);
        updateMarker(office.lat, office.lng, office.nickname);
        console.log(office.nickname);
    }

    return (<div className="search-container">
        <div className="search-inner">
            <input type='text' placeholder='Search...' value={value} onChange={onChange} />
            {/* <button className='search-button' onClick={() => onSearch(value)}> Search </button> */}
        </div>

        <div className='dropdown'>
            {
                offices.map(item => SearchResultRow(item, onClickRow))
            }
        </div>

        <div>
            {listening ?
                < i class="bi bi-mic-fill" onClick={SpeechRecognition.stopListening}></i>
                :
                <i class="bi bi-mic-mute-fill" onClick={SpeechRecognition.startListening}></i>
            }
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    </div>);

}

export default SearchBar;