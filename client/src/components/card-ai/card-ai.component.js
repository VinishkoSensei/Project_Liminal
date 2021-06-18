import React, { useState } from 'react';
import Switch from '../shared/switch/switch.component';
import './card-ai.styles.scss';
import { Trans } from '@lingui/macro';

const CardAi = () => {
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="card-ai">
      <div className="card-ai-switch">
        <span>
          <Trans>Smart Volume Contol:</Trans>
        </span>
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
