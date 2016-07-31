import React from "react";

function SearchBox(props) {
    return (
        <form className="filter-form">
            <input
                placeholder="Search..."
                className="filter"
                type="search"
                value={props.filter}
                onChange={props.onFilterChange}/>
        </form>
    );
}

export default SearchBox;