import React from 'react';
import Track from 'components/track/track.component';
import '../cards-playlist.styles.scss';

const CardPlaylistRadio = ({ radioQueue, setRadioQueue }) => {
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
    <div className="card-playlist radio">
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

export default CardPlaylistRadio;
