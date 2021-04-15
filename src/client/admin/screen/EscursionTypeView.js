import React, {useState} from 'react';

import {displayScheduleType, ticketsCost} from './AdminTypesScreen';
//import EscursionTypeForm from './EscursionTypeForm';
import EscursionTypeForm from './ExcursionTypeForm';

export default function EscursionTypeView({typeData, onChange}) {
  const [editing, setEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const options = JSON.parse(typeData.options);
  let schedule;
  if (typeData.schedule_type === 'grid') {
    schedule = options.schedule;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
  }
  const edit = () => {
    setEditMode(true);
    setEditing(true);
  };
  const create = () => {
    setEditMode(false);
    setEditing(true);
  };
  const onFormExit = (result) => {
    if (result) {
      onChange();
    }
    setEditing(false);
  }
  const emptyTypeData = {
    name: '',
    description: '',
    participants: 0,
    options: JSON.stringify({
      tickets: {
        fullcost: 0,
        discount: 0,
        free: 0,
      }
    }),
    schedule_type: 'grid',
  };

  return (
    <div className="excursion-type-view">
      {!editing &&
        <>
          <table><tbody>
            <tr><td>Наименование</td><td>{typeData.name}</td></tr>
            <tr><td>Описание</td><td>{typeData.description}</td></tr>
            <tr><td>Участников</td><td>{typeData.participants}</td></tr>
            <tr><td>Цена билетов</td><td>{ticketsCost(options.tickets)}</td></tr>
            <tr><td><h3>Расписание</h3></td><td>{displayScheduleType(typeData.schedule_type)}</td></tr>
            {typeData.schedule_type === 'grid' &&
              <>
              <tr><td>Время начала</td><td>{schedule && schedule.timeStart}</td></tr>
              <tr><td>Время окончания</td><td>{schedule && schedule.timeEnd}</td></tr>
              <tr><td>Интервал</td><td>{schedule && schedule.interval}</td></tr>
              </>
            }
            <tr><td>Действует с</td><td>{typeData.date_from}</td></tr>
            <tr><td>Действует по</td><td>{typeData.date_to}</td></tr>
          </tbody></table>
          <div className="action-buttons">
            <button type="button" className="button-fullscreen" onClick={() => edit()}>Редактировать</button>
            {/*<button type="button" className="button-fullscreen" onClick={() => create()}>Создать</button>*/}
          </div>
        </> }

      {editing &&
        <EscursionTypeForm typeData={editMode ? typeData : emptyTypeData} editMode={editMode} onExit={onFormExit}/>}
    </div>
  );
}
