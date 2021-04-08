import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/AdminStore';
import ExcursionType from '../../api/ExcursionType';
import EscursionTypeView from './EscursionTypeView';
import {Config} from '../../config';
import {formatTime} from '../../utils';

export function displayScheduleType(schedule_type) {
  switch (schedule_type) {
    case 'grid':
      return 'стандартное';
    case 'custom':
      return 'произвольное';
    default:
      return '';
  }
}
export function ticketsCost(tickets) {
  return tickets.fullcost + ' / ' + tickets.discount;
}

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
//  const ticketsCost = () => options.tickets.fullcost + ' / ' + options.tickets.discount;
  return (
    <tr key={id} onClick={() => onRowClick(typeData)}>
      <td>{name}</td>
      <td>{descr()}</td>
      <td>{participants}</td>
      <td>{ticketsCost(options.tickets)}</td>
      <td>{displayScheduleType(schedule_type)}</td>
      <td>{date_from}</td>
      <td>{date_to}</td>
    </tr>
  );
}


export default function AdminTypesScreen() {
  const [typesData, setTypesData] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  useEffect(() => {
    ExcursionType.getExcursionTypes()
      .then(data => {
        console.log('getExcursionTypes', data);
        setTypesData(data);
      })
  }, []);

  const onRowClick = (typeData) => {
    console.log('onRowClick ', typeData);
    setSelectedType(typeData);
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
            <th>Цена билетов</th>
            <th>Тип расписания</th>
            <th>Действует с</th>
            <th>Действует по</th>
          </tr>
          </thead>
          <tbody>
          {typesData.map(typeData => TypeTableRow(typeData, onRowClick))}
          </tbody>
        </table>
      </div>
      {!selectedType &&
        <p>(Выберите тип (строку в таблице) для просмотра и редактирования)</p>
      }
      {selectedType &&
        <EscursionTypeView typeData={selectedType} />
      }

    </div>
  );
}
