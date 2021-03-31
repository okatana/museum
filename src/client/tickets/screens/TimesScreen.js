import React, {useEffect, useState} from 'react';

import {Config} from '../../config';
import {store, screens} from '../../components/TicketsStore';
import {dateWithWeekDay, formatTime} from '../../utils';
import {getExcursionsForDate} from '../../api';

//function TimeBillet({excursionId, ticketsAvailable, timeString}) {
function TimeBillet(excursion) {
  const {id, participants_limit, sold, reserved, datetime} = excursion;
  const onClick = () => {
    store.setScreen(screens.ORDER);
    store.setSelectedExcursion(excursion);
  }
  const available = Math.max(participants_limit - sold - reserved, 0);
  const disabledClass = available === 0 ? 'disabled' : '';
  return (
    <div className={`time-billet ${disabledClass}`} key={id} onClick={() => onClick()}>
      <span className="time-billet-time">{`${formatTime(datetime)}`}</span>
      <span className="time-billet-available">{available}</span>
    </div>
  );
};

export default function TimesScreen() {
  const selectedDate = store.selectedDate;
  const [times, setTimes] = useState([]);
  useEffect(() => {
    getExcursionsForDate(Config.excursionTypeId, selectedDate)
      .then(data => {
        console.log(data);
        setTimes(data);
      })
  }, []);

  return (
    <div className="times-screen">
      <h2>{dateWithWeekDay(selectedDate)}</h2>
      <h3>Выберите день</h3>
      <div className="time-billets">
        {times.map(excursion => (TimeBillet(excursion)))}
      </div>
    </div>
  );
}
