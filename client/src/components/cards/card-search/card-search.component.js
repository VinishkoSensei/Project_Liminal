import React, { useState, useEffect } from 'react';
import Track from 'components/track/track.component';
import { handleChangeSingle } from 'utils/utils';
import './card-search.styles.scss';
import { Trans } from '@lingui/macro';

const CardSearch = ({
  addToRadioQueueStart,
  addToRadioQueueEnd,
  noMenu,
  CardBlur,
}) => {
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [searchType, setSearchType] = useState('all');

  useEffect(() => {
    const getTrackList = async () => {
      const response = await fetch(
        `http://localhost:3001/gettracks?` +
          new URLSearchParams({ type: searchType, query }),
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const newTrackList = await response.json();
      setTracks(newTrackList);
    };

    getTrackList();
  }, [searchType, query]);

  useEffect(() => {
    setSearchbarOnTop(query.length);
  }, [query]);

  const SearchList = [
    { name: 'all', label: <Trans>All</Trans> },
    { name: 'authors', label: <Trans>Authors</Trans> },
    { name: 'tracks', label: <Trans>Tracks</Trans> },
  ];

  return (
    <div className={`card-search${searchbarOnTop ? ' searched' : ''}`}>
      <div className="placeholder" />
      <form className="searchbar">
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
          {SearchList.map((searchItem) => (
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
          <div className="searchlist-tracks">
            {tracks?.map((track, index) =>
              addToRadioQueueStart && addToRadioQueueEnd ? (
                <Track
                  key={index}
                  track={track}
                  index={index}
                  addToRadioQueueStart={addToRadioQueueStart}
                  addToRadioQueueEnd={addToRadioQueueEnd}
                />
              ) : noMenu ? (
                <Track key={index} track={track} index={index} />
              ) : (
                <Track
                  key={index}
                  track={track}
                  index={index}
                  showAddToStart
                  showAddToEnd
                />
              )
            )}
          </div>
        </div>
      </div>
      {CardBlur ? CardBlur : null}
    </div>
  );
};

export default CardSearch;
