import React, { useRef, useEffect } from 'react';
import Track from '../track/track.component';
import { connect } from 'react-redux';
import './card-playlist.styles.scss';

const CardPlaylist = ({ changedCards, playlist, prevPlaylist }) => {
  const hrRef = React.useRef(null);
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

  useEffect(() => {
    hrRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="card-playlist">
      <div className="card-big-table">
        {prevPlaylist?.map((track, index) => (
          <Track track={track} index={index} key={index} />
        ))}
        <hr ref={hrRef} />
        {playlist?.map((track, index) => (
          <Track track={track} index={index} key={index} />
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
