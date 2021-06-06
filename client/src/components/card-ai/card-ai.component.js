import React, { useState } from 'react';
import Switch from '../shared/switch/switch.component';
import './card-ai.styles.scss';

const CardAi = ({ changedCards }) => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="card-ai">
      <div className="card-ai-switch">
        <span>Smart Volume Contol:</span>
        <Switch
          index="swich-ai"
          checked={checked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default CardAi;
