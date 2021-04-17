import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './profile.styles.scss';
import { signInStart } from '../../redux/user/user.actions';

const Profile = ({
  signInStart,
  profile,
  setProfileExpanded,
  profileExpanded,
}) => {
  const [minifiedProfile, setMinifiedProfile] = useState(true);

  useEffect(() => {
    //signInStart('john1doe@gmail.com', 'johndoe');
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <div
            className={`profile-main`}
            onClick={() => setMinifiedProfile(!minifiedProfile)}
          >
            <div className="profile-icon-container">
              <img
                src={`http://localhost:3001/getprofileimage/${profile.avatar}`}
                alt="profileimage"
              />
            </div>
            <div className="profile-info-main">
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
          </div>
          <div
            className={`profile-info${minifiedProfile ? ' minified' : ''}`}
            onClick={() => setProfileExpanded(!profileExpanded)}
          >
            <div>
              <i>{profile.email}</i>
            </div>
            <div>{profile.birth_date}</div>
            <div>{profile.subscribed ? 'subscribed' : 'not subscribed'}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password) => dispatch(signInStart(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
