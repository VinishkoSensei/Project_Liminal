import React from 'react';
import './card-signup.styles.scss';
import { connect } from 'react-redux';

const CardSignUp = ({changedCards}) => {
  return (
    <div className="card-signup">
      <form>
        <input placeholder="Email"/>
        <input placeholder="Username"/>
        <input placeholder="Firstname"/>
        <input placeholder="Lastname"/>
        <input type="file"/>
        <input placeholder="Password" type="password"/>
        <input placeholder="Password confirmation" type="password"/>
        <input type="submit" value="Sign Up"/>
        </form>
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