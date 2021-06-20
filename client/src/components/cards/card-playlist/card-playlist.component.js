import React, { useRef, useEffect } from 'react';
import Track from 'components/track/track.component';
import { connect } from 'react-redux';
import './card-playlist.styles.scss';

const CardPlaylist = ({ changedCards, playlist, prevPlaylist }) => {
  const hrRef = useRef(null);

  useEffect(() => {
    hrRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="card-playlist">
      <div className="card-big-table">
        {prevPlaylist?.map((track, index) => (
          <Track
            track={track}
            index={index}
            key={index}
            showAddToStart
            showAddToEnd
          />
        ))}
        <hr ref={hrRef} />
        {playlist?.map((track, index) => (
          <Track
            track={track}
            index={index}
            key={index}
            showDelete
            showAddToEnd
          />
        ))}
      </div>
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  playlist: state.music.playlist,
  prevPlaylist: state.music.prevPlaylist,
});

export default connect(mapStateToProps)(CardPlaylist);
