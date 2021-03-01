import React, { useState } from 'react';
import './homepage.styles.scss';
import LineTo from 'react-lineto';

import Header from '../../components/header/header.component';
import Player from '../../components/player/player.component';

import { profiledummy } from '../../dummies/profile-dummy';
import { tracksdummy } from '../../dummies/tracks-dummy';

const HomePage = () => {
  const [changedCards, setChangedCards] = useState(false);
  const [minifiedProfile, setMinifiedProfile] = useState(false);
  const [windowSize, setWindowSize] = useState(
    window.innerWidth * window.innerHeight
  );
  window.addEventListener('resize', () =>
    setWindowSize(window.innerWidth * window.innerHeight)
  );

  return (
    <div className="main">
      <div className="toppart">
        <Header />
        <Player />
      </div>
      <div className="main-part">
        <div className="main-space">
          <div className="main-container">
            <div className="cards-container">
              {/*s<div className="cards top">
                <div className="card lt">
                  <div className="card-image-container">
                    <img src="/images/ai.svg" alt="ai" />
                  </div>
                </div>
                <div className="card rt">
                  <div className="card-image-container">
                    <img src="/images/broadcast.svg" alt="broadcast" />
                  </div>
                </div>
              </div>
              <div className="card-center">
                <div className="card-center-icon" />
              </div>
              <div className="cards bottom">
                <div className="card lb">
                  <div className="card-image-container">
                    <img src="/images/playlist.svg" alt="playlist" />
                  </div>
                </div>
                <div className="card rb">
                  <div className="card-image-container">
                    <img src="/images/music.svg" alt="music" />
                  </div>
                </div>
              </div>*/}
              <div className="card-big-container">
                <div
                  className={`card-big-primary${
                    changedCards ? ' disabled' : ''
                  }`}
                  onClick={() => setChangedCards(false)}
                >
                  <div className="card-big-cover-container">
                    <img src={`/${profiledummy.photourl}`} alt="profileimage" />
                  </div>
                  <div className="card-big-controls">
                    <div className="card-big-control">
                      <img
                        src="/images/forward.svg"
                        alt="backward"
                        style={{
                          WebkitTransform: 'scaleX(-1)',
                          transform: 'scaleX(-1)',
                        }}
                      />
                    </div>
                    <div className="card-big-control">
                      <img src="/images/play.svg" alt="play" />
                    </div>
                    <div className="card-big-control">
                      <img src="/images/forward.svg" alt="forward" />
                    </div>
                  </div>
                  <div
                    className={`card-big-blur${
                      changedCards ? '' : ' disabled'
                    }`}
                  ></div>
                </div>
                <div
                  className={`card-big-secondary${
                    changedCards ? '' : ' disabled'
                  }`}
                  onClick={() => setChangedCards(true)}
                >
                  <div className="card-big-table">
                    {tracksdummy.map((track) => (
                      <div className="track">
                        <div className="track-cover-container">
                          <img
                            src={track.cover}
                            alt="cover"
                            width="60px"
                            height="60px"
                          />
                        </div>
                        <div className="track-info">
                          <div>{track.name}</div>
                          <div>
                            <i>{track.author}</i>
                          </div>
                        </div>
                        <div className="track-duration">
                          <p>{track.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`card-big-blur${
                      changedCards ? ' disabled' : ''
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rightpanel">
          <div
            className={`profile${minifiedProfile ? ' minified' : ''}`}
            onClick={() => setMinifiedProfile(!minifiedProfile)}
          >
            <div className="profile-icon-container">
              <img src={`/${profiledummy.photourl}`} alt="profileimage" />
            </div>
            <div className="profile-info">
              <p>{profiledummy.name}</p>
              <div className="profile-additional">
                <p>
                  <i>{profiledummy.email}</i>
                </p>
                <p>{profiledummy.dateofbirth}</p>
                <p>{profiledummy.status}</p>
              </div>
            </div>
          </div>
          <div className="news"></div>
        </div>
      </div>
      <div className="footer"></div>
      <LineTo
        from="card-center-icon"
        to="card lt"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card rt"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card lb"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
      <LineTo
        from="card-center-icon"
        to="card rb"
        delay={0}
        zIndex={2}
        className={`line ${windowSize}`}
      />
    </div>
  );
};

export default HomePage;
