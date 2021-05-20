import React, { useState, useEffect } from 'react';
import './card-admin.styles.scss';
import CardSearch from '../card-search/card-search.component';
import CardAddTrack from '../card-addtrack/card-addtrack.component';
import CardRadioPlaylist from '../card-radio-playlist/card-radio-playlist.component';

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

  return (
    <div className={`card-admin expanded`}>
      <div className="card-admin-main">
        <CardSearch
          addToRadioQueueStart={addToRadioQueueStart}
          addToRadioQueueEnd={addToRadioQueueEnd}
        />
        {/*<CardRadioPlaylist
          radioQueue={radioQueue}
          setRadioQueue={setRadioQueue}
        />*/}
        <CardAddTrack />
      </div>
    </div>
  );
};

export default CardAdmin;
