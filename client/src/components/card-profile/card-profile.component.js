import React from 'react';
import './card-profile.styles.scss';
import { connect } from 'react-redux';

const CardProfile = ({ changedCards, profile, profileExpanded }) => {
  return (
    <div className={`card-profile${profileExpanded ? ' expanded' : ''}`}>
      {profile ? (
        <div className="card-profile-main">
          <div className="card-profile-image">
            <img
              src={`http://localhost:3001/getprofileimage/${profile.avatar}`}
              alt="profileimage"
            />
          </div>
          <div className="profile-info-main">
            <div>
              {profile.first_name}&nbsp;{profile.last_name}
            </div>
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

export default connect(mapStateToProps)(CardProfile);
