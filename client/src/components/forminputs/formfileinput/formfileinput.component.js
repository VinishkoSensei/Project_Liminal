import React, { useRef } from 'react';
import '../forminput.styles.scss';
import { Trans } from '@lingui/macro';

const FormFileInput = ({ handleChange, ...otherProps }) => {
  const fileRef = useRef(null);

  return (
    <div className="group">
      <input
        className="forminput file"
        type="file"
        ref={fileRef}
        onChange={handleChange}
        {...otherProps}
      />
      <input className="forminput" onChange={handleChange} disabled />
      <label className={`forminputlabel`}>
        {fileRef.current && fileRef.current.files[0] ? (
          fileRef.current.files[0].name
        ) : (
          <Trans>Upload file...</Trans>
        )}
      </label>
    </div>
  );
};

export default FormFileInput;
