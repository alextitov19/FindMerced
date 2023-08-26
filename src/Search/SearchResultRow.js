const SearchResultRow = (office) => {
    return (<div class='dropdown-row'>
    <div>{office.building}</div>
    <div>{office.room}</div>
    <div>{office.hours}</div>
    <div>{office.days}</div>
</div>)
}

export default SearchResultRow;