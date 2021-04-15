import React, {useEffect, useState} from 'react';

import {screens, store} from '../../components/AdminStore';
import MenuButton from '../../components/MenuButton';
import ExcursionType from '../../api/ExcursionType';

export default function AdminMainScreen() {
  const [typesData, setTypesData] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    ExcursionType.getExcursionTypes()
      .then(data => {
        store.setExcursionTypes(data);
        setTypesData(data);
      })
  }

  const onTypesClick = () => {store.setScreen(screens.TYPES)};
  const onScheduleClick = () => {store.setScreen(screens.SCHEDULE)};
  const onDatesClick = () => {store.setScreen(screens.DATES)};
  const onTodayClick = () => {store.setScreen(screens.TIMES)};

  return (
    <div className="main-screen">
      <div className="navigation">
        <MenuButton label="Типы экскурсий" onClick={onTypesClick} />
        <MenuButton label="Расписание" onClick={onScheduleClick} />
        <MenuButton label="Даты" onClick={onDatesClick} />
        <MenuButton label="Сегодня" onClick={onTodayClick} />
      </div>
      <div className="main-stats">
        Типов экскурсий - {typesData.length}
      </div>
    </div>
  );
}