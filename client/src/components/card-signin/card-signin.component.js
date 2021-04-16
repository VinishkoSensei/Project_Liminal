import React from 'react';
import './card-signin.styles.scss';
import { connect } from 'react-redux';

const CardSignIn = ({changedCards}) => {
  return (
    <div className="card-signin">
      <div />
      <div className={`card-big-blur${changedCards ? '' : ' disabled'}`}></div>
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
export default CardSignIn;
