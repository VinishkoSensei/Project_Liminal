import React, { useEffect, useState } from 'react';
import './card-playlist.styles.scss';

const CardPlaylist = ({ changedCards, setChangedCards, setSrc }) => {
  const [trackList, setTrackList] = useState();

  const PlayTrack = (id) => {
    setSrc(`http://localhost:3001/tracks/${id}`);
  };

  useEffect(() => {
    const getTrackList = async () => {
      try {
        const res = await fetch(`http://localhost:3001/gettracklist`);
        const data = await res.json();
        setTrackList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTrackList();
  }, []);

  return (
    <div className="card-playlist">
      <div className="card-big-table">
        {trackList?.map((track) => (
          <div
            className="track"
            key={track.id}
            onClick={() => PlayTrack(track.id)}
          >
            <div className="track-cover-container">
              <img
                src={`http://localhost:3001/gettrackcover/${track.cover}`}
                alt="cover"
                width="60px"
                height="60px"
              />
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
