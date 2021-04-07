import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/AdminStore';
import ExcursionType from '../../api/ExcursionType';
import {Config} from '../../config';
import {formatTime} from '../../utils';

function TypeTableRow(typeData, onRowClick) {
  const {id, name, description, participants, schedule_type, date_from, date_to} = typeData;
  const options = JSON.parse(typeData.options);
  const descr = () => {
    const limit = 20;
    if (description) {
      return description.length <= limit ? description : description.substr(0, limit) + '...';
    }
    return '';
  };
  const type = () => {
    switch (schedule_type) {
      case 'grid':
        return 'стандартное';
      case 'custom':
        return 'произвольное';
      default:
        return '';
    }
  }
  const ticketsCost = () => options.tickets.fullcost + ' / ' + options.tickets.discount;
  return (
    <tr key={id} onClick={() => onRowClick(typeData)}>
      <td>{name}</td>
      <td>{descr()}</td>
      <td>{participants}</td>
      <td>{type()}</td>
      <td>{ticketsCost()}</td>
      <td>{date_from}</td>
      <td>{date_to}</td>
    </tr>
  );
}


export default function AdminTypesScreen() {
  const [typesData, setTypesData] = useState([]);
  useEffect(() => {
    ExcursionType.getExcursionTypes()
      .then(data => {
        console.log('getExcursionTypes', data);
        setTypesData(data);
      })
  }, []);

  const onRowClick = (typeData) => {
    console.log('onRowClick ', typeData);
  }


  return (
    <div className="types-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.MAIN)}}/>
        <h2>Типы экскурсий</h2>
        <div></div>
      </div>
      <div className="admin-table">
        <table>
          <thead>
          <tr>
            <th>Наименование</th>
            <th>Описание</th>
            <th>Участников</th>
            <th>Тип расписания</th>
            <th>Цена билетов</th>
            <th>Действует с</th>
            <th>Действует по</th>
          </tr>
          </thead>
          <tbody>
          {typesData.map(typeData => TypeTableRow(typeData, onRowClick))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
