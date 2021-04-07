import React from 'react';

export default function MenuButton({label, onClick}) {
  return (
    <button type="button" onClick={onClick} >{label}</button>
  );
}