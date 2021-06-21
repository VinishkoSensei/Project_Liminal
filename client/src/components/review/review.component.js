import React, { useState } from 'react';
import './review.styles.scss';
import { connect } from 'react-redux';
import { addNotificationStart } from 'redux/notification/notification.actions';
import CustomButton from 'components/shared/custombutton/custombutton.component';
import FormInput from 'components/shared/forminputs/forminput/forminput.component';
import { handleChange } from 'utils/utils';
import { Trans } from '@lingui/macro';

const Review = ({ profileid, addNotificationStart }) => {
  const [minifiedProfile, setMinifiedProfile] = useState(true);
  const reviewInitialState = { theme: '', text: '' };
  const [review, setReview] = useState(reviewInitialState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3001/createreview`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: review.theme,
        reviewtext: review.text,
        userid: profileid,
      }),
    });
    if (response.ok) {
      addNotificationStart('Your reply was sended', 'success');
      setMinifiedProfile(true);
      setReview(reviewInitialState);
    }
  };

  return (
    <div>
      <div className="review-container">
        <div
          className={`review-main`}
          onClick={() => setMinifiedProfile(!minifiedProfile)}
        >
          <div className="review-container-main">
            <Trans>Leave a reply</Trans>
          </div>
        </div>
        <form className={`review-info${minifiedProfile ? ' minified' : ''}`}>
          <FormInput
            name="theme"
            value={review.theme}
            label={<Trans>Theme...</Trans>}
            handleChange={handleChange(review, setReview)}
            required
          />
          <textarea
            placeholder="Text..."
            value={review.text}
            name="text"
            onChange={handleChange(review, setReview)}
          />
          <CustomButton type="submit" onClick={handleSubmit}>
            <Trans>Send</Trans>
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profileid: state.user.profile.id,
});

const mapDispatchToProps = (dispatch) => ({
  addNotificationStart: (text, notificationType) =>
    dispatch(addNotificationStart(text, notificationType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);
