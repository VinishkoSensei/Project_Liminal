import React, { useEffect } from 'react';
import './card-playlist.styles.scss';

const CardPlaylist = ({
  changedCards,
  setChangedCards,
  setSrc,
  playlist,
  setPlaylist,
}) => {
  const playTrack = (id, index) => {
    setSrc(`http://localhost:3001/tracks/${id}`);
    deleteFromPlaylist(index);
  };

  const deleteFromPlaylist = (index) => {
    setPlaylist(
      playlist.filter((el, ind) => {
        return ind !== index;
      })
    );
  };
  /*
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
  }, []);*/

  return (
    <div className="card-playlist">
      <div className="card-big-table">
        {playlist?.map((track, index) => (
          <div className="track" key={index}>
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
            <div className="track-menu">
              <div
                className="track-menu-item"
                onClick={() => playTrack(track.id, index)}
                style={{ backgroundImage: `url('/images/play.svg')` }}
              />
              <div
                className="track-menu-item"
                onClick={() => deleteFromPlaylist(index)}
                style={{ backgroundImage: `url('/images/trash.svg')` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`}></div>
    </div>
  );
};

export default CardPlaylist;
