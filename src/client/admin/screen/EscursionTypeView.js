import React, {useState} from 'react';

import {displayScheduleType, ticketsCost} from './AdminTypesScreen';
//import EscursionTypeForm from './EscursionTypeForm';
import EscursionTypeForm from './ExcursionTypeForm';

export default function EscursionTypeView({typeData}) {
  const [editing, setEditing] = useState(false);
  const options = JSON.parse(typeData.options);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="excursion-type-view">
      <table><tbody>
        <tr><td>Наименование</td><td>{typeData.name}</td></tr>
        <tr><td>Описание</td><td>{typeData.description}</td></tr>
        <tr><td>Участников</td><td>{typeData.participants}</td></tr>
        <tr><td>Цена билетов</td><td>{ticketsCost(options.tickets)}</td></tr>
        <tr><td><h3>Расписание</h3></td><td>{displayScheduleType(typeData.schedule_type)}</td></tr>
        <tr><td>Действует с</td><td>{typeData.date_from}</td></tr>
        <tr><td>Действует по</td><td>{typeData.date_to}</td></tr>
      </tbody></table>
      <button type="button" onClick={() => setEditing(true)}>Редактировать</button>

      {editing && <EscursionTypeForm typeData={typeData} />}
    </div>
  );
}
