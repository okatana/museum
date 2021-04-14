import React from 'react';

export default function FormTextElement({label, required=false, onChange, defaultValue, value, placeholder,
                                          type="text"}) {
  return (
    <div className="form-element">
      <label>{label}{required && <span className="required" />}: </label>
      <input type="text" defaultValue={defaultValue} value={value}
             placeholder={placeholder} type={type}
             onChange={event => onChange(event.target.value)}/>
    </div>
  );
}
