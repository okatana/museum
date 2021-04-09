import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/AdminStore';
import {dateWithWeekDay} from '../../utils';
import {getExcursionDates} from '../../api';
import {Config} from '../../config';
import ExcursionType from '../../api/ExcursionType';
import AdminTypeTable from './AdminTypeTable';
import CreateScheduleForm from './CreateScheduleForm';

function DateBillet(dateString) {
  return (
    <div className="date-billet" key={dateString}>
      {dateWithWeekDay(dateString)}
    </div>
  );
};


export default function AdminScheduleScreen() {
  const [dates, setDates] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    getExcursionDates(Config.excursionTypeId)
      .then(data => {
        console.log(data);
        setDates(data.map(dateObject => dateObject.date));
      });
    ExcursionType.getExcursionTypes()
      .then(data => {
        console.log('getExcursionTypes', data);
        setTypesData(data);
        if (data.length == 1) {
          setSelectedType(data[0]);
        }
      });
  }, []);

  const onRowClick = (typeData) => {
    console.log('onRowClick ', typeData);
    setSelectedType(typeData);
  }

  return (
    <div className="schedule-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.MAIN)}}/>
        <h2>Создание расписаний</h2>
        <div></div>
      </div>
      <div className="schedule-screen-dates">
        <h2>Экскурсии назначены</h2>
        <div className="date-billets">
          {dates.map(date => (DateBillet(date)))}
        </div>
        <h2>Типы экскурсий</h2>
        <AdminTypeTable typesData={typesData} onRowClick={onRowClick} />
        <h2>Создать расписание</h2>
        {selectedType &&
          <CreateScheduleForm typeId={selectedType.id} />
        }
      </div>
    </div>
  );
}
