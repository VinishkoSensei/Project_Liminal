import React, { useState, useEffect } from 'react';
import './card-userlist.styles.scss';

const CardUserList = ({}) => {
  const [query, setQuery] = useState('');
  const [searchbarOnTop, setSearchbarOnTop] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchType, setSearchType] = useState('all');
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const getUserList = async () => {
      const response = await fetch(`http://localhost:3001/getuserlist`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      });
      const newUserList = await response.json();
      setUserList(newUserList);
    };

    getUserList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSearchbarOnTop(query.length);
  };

  const getNameColor = (isAdmin, subscribed) => {
    if (isAdmin) return 'user admin';
    if (subscribed) return 'user subscribed';
    return 'user';
  };

  return (
    <div className={`card-search${searchbarOnTop ? ' searched' : ''}`}>
      <div className="placeholder" />
      <form className="searchbar" onSubmit={handleSubmit}>
        <div className="searchbar-image">
          <button type="submit" className="searchbar-image-button">
            <img
              src="images/magnifier.svg"
              alt="magnifier"
              width="100%"
              height="100%"
            />
          </button>
        </div>
        <div className="searchbar-query">
          <input type="text" onChange={handleChange} />
        </div>
      </form>
      <div className={`searchlist${searchbarOnTop ? ' searched' : ''}`}>
        <div className="searchlist-buttons">
          <div
            className={`button${searchType === 'all' ? ' selected' : ''}`}
            onClick={() => setSearchType('all')}
          >
            All
          </div>
          <div
            className={`button${searchType === 'admins' ? ' selected' : ''}`}
            onClick={() => setSearchType('admins')}
          >
            Admins
          </div>
          <div
            className={`button${searchType === 'regular' ? ' selected' : ''}`}
            onClick={() => setSearchType('regular')}
          >
            Regular
          </div>
        </div>
        <div className="searchlist-list">
          <div className="searchlist-tracks">
            {userList?.map((user, index) => (
              <div className="track" key={index}>
                <div className="track-cover-container">
                  {user.cover ? (
                    <img
                      src={`http://localhost:3001/gettrackcover/${user.cover}`}
                      alt="cover"
                      width="60px"
                      height="60px"
                    />
                  ) : null}
                </div>
                <div className="track-info">
                  <div className={getNameColor(user.isadmin, user.subscribed)}>
                    {user.first_name} {user.last_name}
                  </div>
                  <div>
                    <i>{user.email}</i>
                  </div>
                </div>
                <div className="track-duration">
                  <div>{user.phone}</div>
                  <div>{user.birth_date}</div>
                </div>
                <div className="track-menu">
                  <div
                    className="track-menu-item"
                    style={
                      !user.isadmin
                        ? { backgroundImage: `url('/images/play.svg')` }
                        : {
                            backgroundImage: `url('/images/play.svg')`,
                            webkitTransform: 'scaleX(-1)',
                            transform: 'scaleX(-1)',
                          }
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserList;
