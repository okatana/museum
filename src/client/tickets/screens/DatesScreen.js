import React, {useEffect, useState} from 'react';

import TicketsInfo from '../../components/TicketsInfo';
import {getExcursionDates} from '../../api/';

const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

function Billet(dateString) {
  const date = new Date(dateString);
  return (
    <div className="date-billet" key={dateString}>{`${weekDays[date.getDay()]} ${dateString}`}</div>
  );
};

export default function DatesScreen() {
  const excursionTypeId = 1;
  const [dates, setDates] = useState([]);
  useEffect(() => {
    getExcursionDates(excursionTypeId)
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
        {dates.map(date => (Billet(date)))}
      </div>
    </>
  );
}
