import React, { useState, useEffect } from 'react';
import { handleChangeSingle } from 'utils/utils';

const CardSearch = ({ searchList, url, CardBlur, renderFunction }) => {
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('all');

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `http://localhost:3001/${url}?` +
          new URLSearchParams({ type: searchType, query }),
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const resultList = await response.json();
      setResults(resultList);
    };

    getResults();
  }, [searchType, query, url]);

  useEffect(() => {
    setSearchbarOnTop(query.length);
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`card-search${searchbarOnTop ? ' searched' : ''}`}>
      <div className="placeholder" />
      <form className="searchbar" onSubmit={handleSubmit}>
        <div className="searchbar-image">
          <button type="submit" className="searchbar-image-button">
            <img
              src="images/magnifier.svg"
              alt="magnifier"
              width="100%"
              height="100%"
            />
          </button>
        </div>
        <div className="searchbar-query">
          <input type="text" onChange={handleChangeSingle(setQuery)} />
        </div>
      </form>
      <div className={`searchlist${searchbarOnTop ? ' searched' : ''}`}>
        <div className="searchlist-buttons">
          {searchList.map((searchItem) => (
            <div
              key={searchItem.name}
              className={`button${
                searchType === searchItem.name ? ' selected' : ''
              }`}
              onClick={() => setSearchType(searchItem.name)}
            >
              {searchItem.label}
            </div>
          ))}
        </div>
        <div className="searchlist-list">
          <div className="searchlist-results">
            {renderFunction(results, setResults)}
          </div>
        </div>
      </div>
      {CardBlur ? CardBlur : null}
    </div>
  );
};

export default CardSearch;
