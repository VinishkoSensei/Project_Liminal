import React from 'react';
import { connect } from 'react-redux';
import './notification.styles.scss';
import { hideNotificationStart } from '../../../redux/notification/notification.actions';

const Notification = ({ notification, hideNotificationStart }) => {
  return (
    <div
      key={notification.key}
      className={`notification ${notification.type} ${notification.status}`}
    >
      <div className="notification-content">
        <div>{notification.text}</div>
        <div
          className="notification-close"
          onClick={() => hideNotificationStart(notification.key)}
        >
          ×
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideNotificationStart: (key) => dispatch(hideNotificationStart(key)),
});

export default connect(null, mapDispatchToProps)(Notification);
