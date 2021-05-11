import React, { useRef } from 'react';
import '../forminput.styles.scss';

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
        {fileRef.current && fileRef.current.files[0]
          ? fileRef.current.files[0].name
          : 'Upload file'}
      </label>
    </div>
  );
};

export default FormFileInput;
