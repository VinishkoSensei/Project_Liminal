import React, { useState } from 'react';
import './card-search.styles.scss';

const CardSearch = ({ changedCards, playlist }) => {
  const [tracks, setTracks] = useState();
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const [searchType, setSearchType] = useState('all');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const AddTrackToPlaylistEnd = (id) => {
    playlist.push(id);
  };

  const AddTrackToPlaylistStart = (id) => {
    playlist.unshift(id);
  };

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
          <input type="text" onChange={handleChange} />
        </div>
      </form>
      <div className={`searchlist${searchbarOnTop ? ' searched' : ''}`}>
        <div className="searchlist-buttons">
          <div
            className={`button${searchType === 'all' ? ' selected' : ''}`}
            onClick={() => setSearchType('all')}
          >
            All
          </div>
          <div
            className={`button${searchType === 'authors' ? ' selected' : ''}`}
            onClick={() => setSearchType('authors')}
          >
            Authors
          </div>
          <div
            className={`button${searchType === 'tracks' ? ' selected' : ''}`}
            onClick={() => setSearchType('tracks')}
          >
            Tracks
          </div>
        </div>
        <div className="searchlist-list">
          <div className="searchlist-tracks">
            {tracks?.map((track) => (
              <div className="track" key={track.id}>
                <div
                  className="track-cover-container"
                  onClick={() => AddTrackToPlaylistStart(track)}
                >
                  <img
                    src={`http://localhost:3001/gettrackcover/${track.cover}`}
                    alt="cover"
                    width="60px"
                    height="60px"
                  />
                </div>
                <div
                  className="track-info"
                  onClick={() => AddTrackToPlaylistEnd(track)}
                >
                  <div>{track.name}</div>
                  <div>
                    <i>{track.author}</i>
                  </div>
                </div>
                <div className="track-duration">
                  <p>{track.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`}></div>
    </div>
  );
};

export default CardSearch;
