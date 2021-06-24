import React from 'react';
import Track from 'components/track/track.component';
import '../card-search.styles.scss';
import CardSearch from 'components/cards/card-search/card-search.component';
import { Trans } from '@lingui/macro';

const SearchTracks = ({
  addToRadioQueueStart,
  addToRadioQueueEnd,
  noMenu,
  CardBlur,
}) => {
  const renderFunctionBase = (addToRadioQueueStart, addToRadioQueueEnd) => {
    return (results) => {
      return results?.map((result, index) =>
        addToRadioQueueStart && addToRadioQueueEnd ? (
          <Track
            key={index}
            track={result}
            index={index}
            addToRadioQueueStart={addToRadioQueueStart}
            addToRadioQueueEnd={addToRadioQueueEnd}
          />
        ) : noMenu ? (
          <Track key={index} track={result} index={index} />
        ) : (
          <Track
            key={index}
            track={result}
            index={index}
            showAddToStart
            showAddToEnd
          />
        )
      );
    };
  };

  const searchList = [
    { name: 'all', label: <Trans>All</Trans> },
    { name: 'authors', label: <Trans>Authors</Trans> },
    { name: 'tracks', label: <Trans>Tracks</Trans> },
  ];

  return (
    <CardSearch
      searchList={searchList}
      url="gettracks"
      CardBlur={CardBlur}
      renderFunction={renderFunctionBase(
        addToRadioQueueStart,
        addToRadioQueueEnd
      )}
    />
  );
};

export default SearchTracks;
