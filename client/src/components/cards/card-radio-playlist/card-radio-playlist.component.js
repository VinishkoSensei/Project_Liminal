import React from 'react';
import './card-radio-playlist.styles.scss';
import Track from 'components/track/track.component';

const CardRadioPlaylist = ({ radioQueue, setRadioQueue }) => {
  const deleteFromRadioQueue = (index) => async () => {
    const response = await fetch(
      `http://localhost:3001/deletetrackfromradioqueue`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          index: index,
        }),
      }
    );
    const newRadioQueue = await response.json();
    setRadioQueue(newRadioQueue);
  };

  return (
    <div className="card-radio-playlist">
      <div className="card-big-table">
        {radioQueue?.map((track, index) => (
          <Track
            track={track}
            index={index}
            key={index}
            deleteFromRadioQueue={deleteFromRadioQueue(track.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardRadioPlaylist;
