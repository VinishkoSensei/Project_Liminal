import React from 'react';
import './card-playlist.styles.scss';
import { tracksdummy } from '../../dummies/tracks-dummy';

const CardPlaylist = ({ changedCards, setChangedCards }) => {
  return (
    <div className="card-playlist">
      <div className="card-big-table">
        {tracksdummy.map((track) => (
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
        ))}
      </div>
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`}></div>
    </div>
  );
};

export default CardPlaylist;
