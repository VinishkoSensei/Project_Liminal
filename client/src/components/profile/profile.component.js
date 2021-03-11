import React, { useState } from 'react';
import './profile.styles.scss';

import { profiledummy } from '../../dummies/profile-dummy';

const Profile = () => {
  const [minifiedProfile, setMinifiedProfile] = useState(false);

  return (
    <div
      className={`profile${minifiedProfile ? ' minified' : ''}`}
      onClick={() => setMinifiedProfile(!minifiedProfile)}
    >
      <div className="profile-icon-container">
        <img src={`/${profiledummy.photourl}`} alt="profileimage" />
        <div className="profile-info-minified">{profiledummy.name}</div>
      </div>
      <div className="profile-info">
        <div className="profile-info-minifying">{profiledummy.name}</div>
        <div className="profile-info-minifying">
          <i>{profiledummy.email}</i>
        </div>
        <div className="profile-info-minifying">{profiledummy.dateofbirth}</div>
        <div className="profile-info-minifying">{profiledummy.status}</div>
      </div>
    </div>
  );
};

export default Profile;
