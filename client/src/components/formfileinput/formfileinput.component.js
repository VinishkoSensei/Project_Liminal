import React from 'react';
import './formfileinput.styles.scss';

const FormFileInput = ({ handleChange, ...otherProps }) => (
  <div className="group-file">
    <input
      className="formfileinput file"
      type="file"
      onChange={handleChange}
      {...otherProps}
    />
    <input className="formfileinput" onChange={handleChange} disabled />
    <label className={`formfileinputlabel`}>Upload file</label>
  </div>
);

export default FormFileInput;
