import React from 'react';

export default function FormTextAreaElement({label, required=false, onChange, defaultValue, rows=4}) {
  return (
    <div className="form-element">
      <label>{label}{required && <span className="required" />}: </label>
      <textarea onChange={event => onChange(event.target.value)} defaultValue={defaultValue} rows={rows}/>
    </div>
  );
}




