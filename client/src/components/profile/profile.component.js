import React, { useState, useEffect } from 'react';
import './profile.styles.scss';

const Profile = () => {
  const [minifiedProfile, setMinifiedProfile] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfileInfo = async () => {
      const res = await fetch(`http://localhost:3001/getprofile`);
      const data = await res.json();
      setProfile(data);
    };

    getProfileInfo();
  }, []);

  return (
    <div>
      {profile ? (
        <div
          className={`profile${minifiedProfile ? ' minified' : ''}`}
          onClick={() => setMinifiedProfile(!minifiedProfile)}
        >
          <div className="profile-icon-container">
            <img
              src={`http://localhost:3001/getprofileimage/${profile.avatar}`}
              alt="profileimage"
            />
            <div className="profile-info-minified">
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-info-minifying">
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
            <div className="profile-info-minifying">
              <i>{profile.email}</i>
            </div>
            <div className="profile-info-minifying">{profile.birth_date}</div>
            <div className="profile-info-minifying">
              {profile.subscribed ? 'subscribed' : 'not subscribed'}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
