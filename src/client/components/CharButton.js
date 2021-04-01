import React from 'react';

export default function CharButton({onClick, disabled, children}) {
  const disabledProp = disabled ? {disabled: "disabled"} : {};
  return(
    <button type="button" onClick={onClick} {...disabledProp}>{children}</button>
  );
}