import React, { useState } from 'react';
import Track from 'components/track/track.component';
import { handleChangeSingle } from 'utils/utils';
import './card-search.styles.scss';
import { Trans } from '@lingui/macro';

const CardSearch = ({
  changedCards,
  addToRadioQueueStart,
  addToRadioQueueEnd,
  noMenu,
  CardBlur,
}) => {
  const [tracks, setTracks] = useState();
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const [searchType, setSearchType] = useState('all');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchbarOnTop(query.length);
    try {
      switch (searchType) {
        case 'authors':
          const res = await fetch(
            `http://localhost:3001/gettracksbyauthor/${query}`
          );
          const data = await res.json();
          setTracks(data);
          break;
        case 'tracks':
          const res1 = await fetch(
            `http://localhost:3001/gettracksbyname/${query}`
          );
          const data1 = await res1.json();
          setTracks(data1);
          break;
        default:
          const res2 = await fetch(
            `http://localhost:3001/gettracksbynameandauthor/${query}`
          );
          const data2 = await res2.json();
          setTracks(data2);
          break;
      }
    } catch (error) {
      console.log(error);
    }
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
          <div
            className={`button${searchType === 'all' ? ' selected' : ''}`}
            onClick={() => setSearchType('all')}
          >
            <Trans>All</Trans>
          </div>
          <div
            className={`button${searchType === 'authors' ? ' selected' : ''}`}
            onClick={() => setSearchType('authors')}
          >
            <Trans>Authors</Trans>
          </div>
          <div
            className={`button${searchType === 'tracks' ? ' selected' : ''}`}
            onClick={() => setSearchType('tracks')}
          >
            <Trans>Tracks</Trans>
          </div>
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
