import React from 'react';
import { connect } from 'react-redux';
import './notification.styles.scss';
import Notification from './notification.component';

const NotificationContainer = ({ notificationArray }) => {
  return (
    <div className="notification-container">
      {notificationArray.map((notification) => (
        <Notification notification={notification} key={notification.key} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  notificationArray: state.notification.notificationArray,
});

export default connect(mapStateToProps)(NotificationContainer);
