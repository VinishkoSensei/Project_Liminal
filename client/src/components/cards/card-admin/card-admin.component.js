import React, { useState, useEffect } from 'react';
import './card-admin.styles.scss';
import SearchTracks from 'components/cards/card-search/search-tracks/search-tracks.component';
import CardAddTrack from 'components/cards/card-addtrack/card-addtrack.component';
import CardPlaylistRadio from 'components/cards/cards-playlist/card-playlist-radio/card-playlist-radio.component';
import SearchUsers from 'components/cards/card-search/search-users/search-users.component';

const CardAdmin = ({
  selectedAdminItem,
  setSelectedAdminItem,
  isOpened,
  setIsOpened,
}) => {
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

  const closeAdminCard = () => {
    setIsOpened(false);
    setTimeout(() => {
      if (!isOpened) setSelectedAdminItem(null);
    }, 2000);
  };

  const chooseCards = (item) => {
    switch (item) {
      case 'track':
        return (
          <div className="card-admin-main">
            <SearchTracks noMenu />
            <CardAddTrack />
          </div>
        );
      case 'users':
        return (
          <div className="card-admin-main">
            <SearchUsers />
          </div>
        );
      case 'playlist':
        return (
          <div className="card-admin-main">
            <SearchTracks
              addToRadioQueueStart={addToRadioQueueStart}
              addToRadioQueueEnd={addToRadioQueueEnd}
            />
            <CardPlaylistRadio
              radioQueue={radioQueue}
              setRadioQueue={setRadioQueue}
            />
          </div>
        );
      default:
        return <div className="card-admin-main"></div>;
    }
  };

  return (
    <div className={`card-admin${isOpened ? ' expanded' : ''}`}>
      <div className="admin-btn-back" onClick={closeAdminCard} />
      {chooseCards(selectedAdminItem)}
    </div>
  );
};

export default CardAdmin;
