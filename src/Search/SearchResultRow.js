import './SearchResultRow.css';

const SearchResultRow = (office) => {
    return (<div class='row'>
        <div class='nickname'>{office.nickname}</div>
        <div class='building'>{office.building}</div>
        <div class='room'>{office.room}</div>
        <div class='hours'>{office.hours}</div>
        <div class='days'>{office.days}</div>
    </div>)
}

export default SearchResultRow;