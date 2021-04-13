import React, {useEffect, useState} from 'react';

import {screens, store} from '../../components/AdminStore';
import MenuButton from '../../components/MenuButton';

export default function AdminMainScreen() {

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
        Здесь будет находится статистическая информация
      </div>
    </div>
  );
}