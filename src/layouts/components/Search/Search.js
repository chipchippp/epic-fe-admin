import React, { useState } from 'react';

function Search({ setSearch }) {
    const [query, setQuery] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSearch(value);
    };

    return (
        <div className="float-right">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={query}
                        onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button">
                            <i className="fas fa-search" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Search;
