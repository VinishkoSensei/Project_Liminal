import React, { useState, useEffect } from 'react';
import './card-admin.styles.scss';
import CardSearch from '../card-search/card-search.component';
import CardAddTrack from '../card-addtrack/card-addtrack.component';
import CardRadioPlaylist from '../card-radio-playlist/card-radio-playlist.component';

const CardAdmin = ({ selectedAdminItem, setSelectedAdminItem }) => {
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

  const BtnBack = () => {
    return (
      <div
        className="admin-btn-back"
        onClick={() => setSelectedAdminItem(null)}
      />
    );
  };

  return (
    <div className={`card-admin${selectedAdminItem ? ' expanded' : ''}`}>
      <BtnBack />
      {selectedAdminItem === 'track' ? (
        <div className="card-admin-main">
          <CardSearch noMenu />
          <CardAddTrack />
        </div>
      ) : (
        <div className="card-admin-main">
          <CardSearch
            addToRadioQueueStart={addToRadioQueueStart}
            addToRadioQueueEnd={addToRadioQueueEnd}
          />
          <CardRadioPlaylist
            radioQueue={radioQueue}
            setRadioQueue={setRadioQueue}
          />
        </div>
      )}
    </div>
  );
};

export default CardAdmin;
