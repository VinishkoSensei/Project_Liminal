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
    /*try {
      switch (searchType) {
        case 'authors':
          const res = await fetch(
            `http://localhost:3001/gettracksbyauthor/${query}`
          );
          const data = await res.json();
          setTracks(data);
          break;
        case 'tracks':
          const res1 = await fetch(
            `http://localhost:3001/gettracksbyname/${query}`
          );
          const data1 = await res1.json();
          setTracks(data1);
          break;
        default:
          const res2 = await fetch(
            `http://localhost:3001/gettracksbynameandauthor/${query}`
          );
          const data2 = await res2.json();
          setTracks(data2);
          break;
      }
    } catch (error) {
      console.log(error);
    }*/
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
              <div>{user}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserList;
