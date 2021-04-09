import React, {useState, useEffect} from 'react';
import {displayScheduleType, ticketsCost} from './AdminTypesScreen';

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

export default function AdminTypeTable({typesData, onRowClick}) {
  return (
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

  );
}
