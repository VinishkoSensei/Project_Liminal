import React, { useState } from 'react';
import './changingcards.styles.scss';

import CardMusic from '../../components/card-music/card-music.component';
import CardPlaylist from '../../components/card-playlist/card-playlist.component';

const ChangingCards = () => {
  const [changedCards, setChangedCards] = useState(false);

  return (
    <div className="card-big-container">
      <div
        className={`card-big-primary${changedCards ? ' disabled' : ''}`}
        onClick={() => setChangedCards(false)}
      >
        <CardMusic
          changedCards={changedCards}
          setChangedCards={setChangedCards}
        />
      </div>
      <div
        className={`card-big-secondary${changedCards ? '' : ' disabled'}`}
        onClick={() => setChangedCards(true)}
      >
        <CardPlaylist
          changedCards={changedCards}
          setChangedCards={setChangedCards}
        />
      </div>
    </div>
  );
};

export default ChangingCards;
