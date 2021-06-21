import React, { useState } from 'react';
import './changingcards.styles.scss';

const ChangingCards = (props) => {
  const [changedCards, setChangedCards] = useState(false);
  const isDisabled = (changedCards, reversed = false) =>
    (changedCards && !reversed) || (!changedCards && reversed)
      ? ' disabled'
      : '';
  const changeCards = () =>
    setChangedCards((prevChangedCards) => !prevChangedCards);

  return (
    <div className="card-big-container">
      <div
        className={`card-big-primary${isDisabled(changedCards)}`}
        onClick={changedCards ? changeCards : null}
      >
        {React.cloneElement(props.children[0], {
          CardBlur: (
            <div
              className={`card-big-blur${isDisabled(changedCards, true)}`}
            ></div>
          ),
        })}
      </div>
      <div
        className={`card-big-secondary${isDisabled(changedCards, true)}`}
        onClick={!changedCards ? changeCards : null}
      >
        {React.cloneElement(props.children[1], {
          CardBlur: (
            <div className={`card-big-blur${isDisabled(changedCards)}`}></div>
          ),
        })}
      </div>
    </div>
  );
};

export default ChangingCards;
