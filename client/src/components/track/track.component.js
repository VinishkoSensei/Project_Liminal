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
  console.log(track.cover);

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
        {playTrack ? (
          <div
            className="track-menu-item"
            onClick={() => playTrack(track.id, index)}
            style={{ backgroundImage: `url('/images/play.svg')` }}
          />
        ) : null}
        {deleteFromPlaylist ? (
          <div
            className="track-menu-item"
            onClick={() => deleteFromPlaylist(index)}
            style={{ backgroundImage: `url('/images/trash.svg')` }}
          />
        ) : null}

        {addTrackToPlaylistStart ? (
          <div
            className="track-menu-item"
            onClick={() => addTrackToPlaylistStart(track)}
            style={{
              backgroundImage: `url('/images/addtopl.svg')`,
              WebkitTransform: 'scaleX(-1) scaleY(-1)',
              transform: 'scaleX(-1) scaleY(-1)',
            }}
          />
        ) : null}

        {addTrackToPlaylistEnd ? (
          <div
            className="track-menu-item"
            onClick={() => addTrackToPlaylistEnd(track)}
            style={{ backgroundImage: `url('/images/addtopl.svg')` }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Track;
