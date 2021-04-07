import React, {useEffect, useState} from 'react';

import MenuButton from '../../components/MenuButton';

export default function AdminMainScreen() {

  const onTypesClick = () => {};
  const onScheduleClick = () => {};
  const onDatesClick = () => {};
  const onTodayClick = () => {};

  return (
    <div className="main-screen">
      <div className="navigation">
        <MenuButton label="Типы экскурсий" onClick={onTypesClick} />
        <MenuButton label="Расписание" onClick={onScheduleClick} />
        <MenuButton label="Даты" onClick={onDatesClick} />
        <MenuButton label="Сегодня" onClick={onTodayClick} />
      </div>
      <div className="main-stats">
        Здесь будет находится статистическая информация
      </div>
    </div>
  );
}