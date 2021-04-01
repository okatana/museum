import React from 'react';
import backButton from '../assets/backButton.png';

export default function BackButton({onClick}) {
  return (
    <div className="image-button" onClick={onClick}>
      <img className="image-button-image" src={backButton} alt="back button" />
    </div>
  );
}
