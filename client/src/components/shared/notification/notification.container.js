import React from 'react';
import { connect } from 'react-redux';
import './notification.styles.scss';
import _ from 'lodash';
import Notification from './notification.component';
import { addNotificationStart } from '../../../redux/notification/notification.actions';
import { notificationTypes } from './notification.types';

const NotificationContainer = ({ notificationArray, addNotificationStart }) => {
  return (
    <div className="notification-container">
      {notificationArray.map((notification) => (
        <Notification notification={notification} />
      ))}
      <button
        onClick={() =>
          addNotificationStart(`Bruh${_.uniqueId()}`, notificationTypes.ERROR)
        }
      >
        ADD
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notificationArray: state.notification.notificationArray,
});

const mapDispatchToProps = (dispatch) => ({
  addNotificationStart: (text, type) =>
    dispatch(addNotificationStart(text, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
