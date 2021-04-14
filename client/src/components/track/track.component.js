import React from 'react';
import './track.styles.scss';
import { connect } from 'react-redux';
import {
  addTrackToPlaylistStart,
  addTrackToPlaylistEnd,
  playTrack,
  deleteFromPlaylist,
} from '../../redux/music/music.actions';

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
        {playTrack ? (
          <div
            className="track-menu-item"
            onClick={() => playTrack(track, index)}
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
            onClick={() => addTrackToPlaylistStart({ track })}
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
            onClick={() => addTrackToPlaylistEnd({ track })}
            style={{ backgroundImage: `url('/images/addtopl.svg')` }}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track, index) => dispatch(playTrack(track, index)),
  deleteFromPlaylist: (index) => dispatch(deleteFromPlaylist(index)),
  addTrackToPlaylistEnd: (id) => dispatch(addTrackToPlaylistEnd(id)),
  addTrackToPlaylistStart: (id) => dispatch(addTrackToPlaylistStart(id)),
});

export default connect(null, mapDispatchToProps)(Track);
