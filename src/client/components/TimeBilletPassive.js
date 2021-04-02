import React from 'react';
import {formatTime} from '../utils';

export function TimeBilletPassive({datetime, ticketsAvailable, ticketsOrdered}) {
  return (
    <div className="time-billet">
      <span className="time-billet-time">{`${formatTime(datetime)}`}</span>
      {ticketsAvailable && <span className="time-billet-available">{ticketsAvailable}</span>}
      {ticketsOrdered && <span className="time-billet-ordered">{ticketsOrdered}</span>}
    </div>
  );
}
