import React, { useState } from 'react';
import './review.styles.scss';
import CustomButton from '../custombutton/custombutton.component';
import { Trans } from '@lingui/macro';

const Review = () => {
  const [minifiedProfile, setMinifiedProfile] = useState(true);
  const [reviewText, setReviewText] = useState('');

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  return (
    <div>
      <div className="review-container">
        <div
          className={`review-main`}
          onClick={() => setMinifiedProfile(!minifiedProfile)}
        >
          <div className="review-container-main">Leave a reply</div>
        </div>
        <div className={`review-info${minifiedProfile ? ' minified' : ''}`}>
          <textarea value={reviewText} onChange={handleChange} />
          <CustomButton type="button">
            <Trans>Send</Trans>
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Review;
