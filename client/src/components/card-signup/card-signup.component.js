import React from 'react';
import './card-signup.styles.scss';
import { connect } from 'react-redux';

const CardSignUp = ({changedCards}) => {
  return (
    <div className="card-signup">
      <div />
      <div className={`card-big-blur${changedCards ? ' disabled' : ''}`} />
      </div>
  );
};
/*
const mapStateToProps = (state) => ({
  isPlaying: state.music.isPlaying,
  currentTrack: state.music.currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  playNextTrack: () => dispatch(playNextTrack()),
  playRadio: () => dispatch(playRadio()),
  emptySrc: () => dispatch(emptySrc()),
});*/

//export default connect(mapStateToProps, mapDispatchToProps)(CardMusic);
export default CardSignUp;