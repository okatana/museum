import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/AdminStore';
import ExcursionType from '../../api/ExcursionType';
import {getExcursionDatesAllTypes} from '../../api';
import {dateWithWeekDay} from '../../utils';


function DateBillet(dateString) {
  const onClick = (dateString) => {
    store.setSelectedDate(dateString);
    store.setScreen(screens.TIMES);
  }
  return (
    <div className="date-billet" key={dateString} onClick={() => onClick(dateString)}>
      {dateWithWeekDay(dateString)}
    </div>
  );
};

export default function AdminDatesScreen() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    getExcursionDatesAllTypes()
      .then(data => {
        console.log('getExcursionDatesAllTypes', data);
        setDates(data);
      })
  }, []);



  return (
    <div className="dates-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.MAIN)}}/>
        <h2>Даты расписаний</h2>
      </div>
      <h3>Выберите день</h3>
      <div className="date-billets">
        {dates.map(date => (DateBillet(date)))}
      </div>

    </div>
  );
}
