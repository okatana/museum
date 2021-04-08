import React from 'react';

export default function FormTextElement({label, required=false, onChange, defaultValue}) {
  return (
    <div className="form-element">
      <label>{label}{required && <span className="required" />}: </label>
      <input type="text" onChange={event => onChange(event.target.value)} defaultValue={defaultValue} />
    </div>
  );
}
