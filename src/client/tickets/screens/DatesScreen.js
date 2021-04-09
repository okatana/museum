import React, {useEffect, useState} from 'react';

import {Config} from '../../config';
import TicketsInfo from '../../components/TicketsInfo';
import {getExcursionDates} from '../../api/';
import {store, screens} from '../../components/TicketsStore';
import {dateWithWeekDay} from '../../utils';

function DateBillet(dateString) {
  const onClick = (dateString) => {
    store.setScreen(screens.TIMES);
    store.setSelectedDate(dateString);
  }
  return (
    <div className="date-billet" key={dateString} onClick={() => onClick(dateString)}>
      {dateWithWeekDay(dateString)}
    </div>
  );
};

export default function DatesScreen() {
  const [dates, setDates] = useState([]);
  useEffect(() => {
    getExcursionDates(Config.excursionTypeId)
      .then(data => {
        console.log(data);
        setDates(data.map(dateObject => dateObject.date));
      })
  }, []);

  return (
    <>
      <TicketsInfo />
      <h2>Выберите день</h2>
      <div className="date-billets">
        {dates.map(date => (DateBillet(date)))}
      </div>
    </>
  );
}
