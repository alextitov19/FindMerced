import './SearchResultRow.css';

const SearchResultRow = (office, onClickFunc) => {
    return (<div class='row' onClick={() => { onClickFunc(office) }}>
        <div class='nickname'>{office.nickname}</div>
        <div class='location'>{office.building + "   " + office.room}</div>
        <div class='hours'>{office.hours}</div>
        <div class='days'>{office.days}</div>
    </div>)
}

export default SearchResultRow;