import React, { useState } from 'react';
import './changingcards.styles.scss';

const ChangingCards = (props) => {
  const [changedCards, setChangedCards] = useState(false);

  return (
    <div className="card-big-container">
      <div
        className={`card-big-primary${changedCards ? ' disabled' : ''}`}
        onClick={() => setChangedCards(false)}
      >
        {React.cloneElement(props.children[0], {
          changedCards: changedCards,
          setChangedCards: setChangedCards,
        })}
      </div>
      <div
        className={`card-big-secondary${changedCards ? '' : ' disabled'}`}
        onClick={() => setChangedCards(true)}
      >
        {React.cloneElement(props.children[1], {
          changedCards: changedCards,
          setChangedCards: setChangedCards,
        })}
      </div>
    </div>
  );
};

export default ChangingCards;
