import React, { useState } from 'react';
import './card-search.styles.scss';

const CardSearch = ({ changedCards }) => {
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchbarOnTop(query.length);
  };

  return (
    <div className={`card-playlist${searchbarOnTop ? ' searched' : ''}`}>
      <div className="placeholder" />
      <form className="searchbar" onSubmit={handleSubmit}>
        <div className="searchbar-image">
          <img
            src="images/magnifier.svg"
            alt="magnifier"
            width="100%"
            height="100%"
          />
        </div>
        <div className="searchbar-query">
          <input type="text" onChange={handleChange} />
        </div>
      </form>
      {/*<div className="card-big-table">
        tracksdummy.map((track) => (
          <div className="track" key={track.id}>
            <div className="track-cover-container">
              <img src={track.cover} alt="cover" width="60px" height="60px" />
            </div>
            <div className="track-info">
              <div>{track.name}</div>
              <div>
                <i>{track.author}</i>
              </div>
            </div>
            <div className="track-duration">
              <p>{track.duration}</p>
            </div>
          </div>
        ))
      </div>*/}
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`}></div>
    </div>
  );
};

export default CardSearch;
