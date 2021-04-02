import React from 'react';
import './track.styles.scss';

const Track = ({
  track,
  index,
  playTrack,
  deleteFromPlaylist,
  addTrackToPlaylistEnd,
  addTrackToPlaylistStart,
}) => {
  return (
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
          onClick={playTrack ? () => playTrack(track.id, index) : null}
          style={{ backgroundImage: `url('/images/play.svg')` }}
        />
        <div
          className="track-menu-item"
          onClick={deleteFromPlaylist ? () => deleteFromPlaylist(index) : null}
          style={{ backgroundImage: `url('/images/trash.svg')` }}
        />
        <div
          className="track-menu-item"
          onClick={
            addTrackToPlaylistEnd ? () => addTrackToPlaylistEnd(track) : null
          }
          style={{ backgroundImage: `url('/images/play.svg')` }}
        />
        <div
          className="track-menu-item"
          onClick={
            addTrackToPlaylistStart
              ? () => addTrackToPlaylistStart(track)
              : null
          }
          style={{ backgroundImage: `url('/images/trash.svg')` }}
        />
      </div>
    </div>
  );
};

export default Track;
