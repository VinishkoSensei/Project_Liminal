import React, { useState, useEffect } from 'react';
import './card-admin.styles.scss';
import CardSearch from '../card-search/card-search.component';
import Track from '../track/track.component';
import CardAddTrack from '../card-addtrack/card-addtrack.component';

const CardAdmin = () => {
  const [radioQueue, setRadioQueue] = useState([]);

  useEffect(() => {
    const getRadioQueue = async () => {
      const response = await fetch(`http://localhost:3001/getradioqueue`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const newRadioQueue = await response.json();
      setRadioQueue(newRadioQueue);
    };

    getRadioQueue();
  }, []);

  const addToRadioQueueStart = ({ track }) => {
    setRadioQueue([track, ...radioQueue]);
  };
  const addToRadioQueueEnd = async ({ track }) => {
    const response = await fetch(`http://localhost:3001/addtracktoradioqueue`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackid: track.id,
      }),
    });
    const newRadioQueue = await response.json();
    setRadioQueue(newRadioQueue);
  };
  const deleteFromRadioQueue = async (index) => {
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
    <div className={`card-admin expanded`}>
      <div className="card-admin-main">
        <CardSearch
          addToRadioQueueStart={addToRadioQueueStart}
          addToRadioQueueEnd={addToRadioQueueEnd}
        />
        {/*<div className="card-radio-playlist">
          <div className="card-big-table">
            {radioQueue?.map((track, index) => (
              <Track
                track={track}
                index={index}
                key={index}
                deleteFromRadioQueue={() => deleteFromRadioQueue(track.id)}
              />
            ))}
          </div>
            </div>*/}
        <CardAddTrack />
      </div>
    </div>
  );
};

export default CardAdmin;
