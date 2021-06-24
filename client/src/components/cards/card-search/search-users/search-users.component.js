import React from 'react';
import './search-users.styles.scss';
import CardSearch from 'components/cards/card-search/card-search.component';
import { Trans } from '@lingui/macro';

const SearchUsers = () => {
  const changeRole = (id, setResults) => async () => {
    await fetch(`http://localhost:3001/changerole`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    });
    setResults((prevResults) =>
      prevResults.map((user) =>
        user.id === id ? { ...user, isadmin: !user.isadmin } : user
      )
    );
  };

  const getNameColor = (isAdmin, subscribed) => {
    if (isAdmin) return 'user admin';
    if (subscribed) return 'user subscribed';
    return 'user';
  };

  const renderFunctionBase = () => {
    return (results, setResults) => {
      return results?.map((result, index) => {
        const {
          id,
          first_name,
          last_name,
          subscribed,
          email,
          phone,
          birth_date,
          isadmin,
          avatar,
        } = result;
        return (
          <div className="user-item" key={index}>
            <div>
              {avatar ? (
                <img
                  src={`http://localhost:3001/getprofileimage/${avatar}`}
                  alt="profileimage"
                  width="60px"
                  height="60px"
                />
              ) : null}
            </div>
            <div className="user-info">
              <div className={getNameColor(isadmin, subscribed)}>
                {first_name} {last_name}
              </div>
              <div>
                <i>{email}</i>
              </div>
            </div>
            <div className="user-duration">
              <div>{phone}</div>
              <div>{birth_date}</div>
            </div>
            <div className="user-menu" onClick={changeRole(id, setResults)}>
              <div className="user-menu-text">
                {isadmin ? <Trans>Make User</Trans> : <Trans>Make Admin</Trans>}
              </div>
              <div
                className="user-menu-item"
                style={{
                  backgroundImage: `url(${
                    isadmin ? '/images/ordinary.svg' : '/images/admin.svg'
                  })`,
                }}
              ></div>
            </div>
          </div>
        );
      });
    };
  };

  const searchList = [
    { name: 'all', label: <Trans>All</Trans> },
    { name: 'admin', label: <Trans>Admins</Trans> },
    { name: 'regular', label: <Trans>Regular</Trans> },
  ];

  return (
    <CardSearch
      searchList={searchList}
      url="getuserlist"
      renderFunction={renderFunctionBase()}
    />
  );
};

export default SearchUsers;
