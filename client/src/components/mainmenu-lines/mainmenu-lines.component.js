import React, { useState } from 'react';
import './mainmenu-lines.styles.scss';

import LineTo from 'react-lineto';

const MainMenuLines = () => {
  const [windowSize, setWindowSize] = useState(
    window.innerWidth * window.innerHeight
  );
  window.addEventListener('resize', () =>
    setWindowSize(window.innerWidth * window.innerHeight)
  );

  return (
    <div>
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

export default MainMenuLines;
