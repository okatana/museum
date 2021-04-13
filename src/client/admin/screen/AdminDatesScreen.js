import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/AdminStore';



export default function AdminDatesScreen() {

  return (
    <div className="dates-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.MAIN)}}/>
        <h2>Даты расписаний</h2>
        <div></div>
      </div>
      <p>Здесь будут показаны даты расписаний, будет возможность достучаться до любого расписания и выполнить с ним определенные действия.</p>
    </div>
  );
}
