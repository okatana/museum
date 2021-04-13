import React, {useEffect, useState} from 'react';

import {store, screens} from '../../components/AdminStore';
import {dateWithWeekDay, formatTime, formatDate} from '../../utils';
import {getExcursionParticipants, getExcursionOfficeTickets} from '../../api';
import {Config} from '../../config';
import BackButton from '../../components/BackButton';
import OfficeTicketsView from './OfficeTicketsView';

function ParticipantTableRow(participantData, onRowClick) {
  const {id, lastname, firstname, midname, phone, email, when_reserved,
    fullcost_tickets, discount_tickets, free_tickets, cost, status} = participantData;
  return (
    <tr key={id} onClick={() => onRowClick({id})}>
      <td>{lastname+' '+firstname+' '+midname}</td>
      <td>{phone}</td>
      <td>{email}</td>
      <td>{fullcost_tickets}</td>
      <td>{discount_tickets}</td>
      <td>{free_tickets}</td>
      <td>{cost}</td>
      <td>{status}</td>
      <td>{formatDate(when_reserved)}</td>
    </tr>
  );
}

export default function AdminExcursionScreen() {
  const {selectedDate, excursionData} = store;
  //console.log('excursionData=', excursionData);
  const [participantsData, setParticipantsData] = useState([]);
  useEffect(() => {
    getExcursionParticipants(excursionData.id)
      .then(data => {
        console.log('getExcursionParticipants', data);
        setParticipantsData(data);
      });
  }, []);

  const onRowClick = (participantData) => {
    console.log('onRowClick ', excursionData);
//    store.setExcursionData(excursionData);
//    store.setScreen(screens.EXCURSION);
  }


  return (
    <div className="excursion-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.TIMES)}}/>
        <h2 className="date-selected">{dateWithWeekDay(selectedDate)}</h2>
        <h2 className="time-selected">{formatTime(excursionData.datetime)}</h2>
      </div>
      <h3>Посетители экскурсии</h3>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Покупатель</th>
              <th colSpan={3}>Куплено билетов</th>
              <th colSpan={3}>Данные покупки</th>
            </tr>
            <tr>
              <th>Ф.И.О.</th>
              <th>Телефон</th>
              <th>email</th>
              <th>полных</th>
              <th>льготных</th>
              <th>бесплатных</th>
              <th>стоимость</th>
              <th>статус</th>
              <th>дата</th>
            </tr>
          </thead>
          <tbody>
          {participantsData.map(participantData => ParticipantTableRow(participantData, onRowClick))}
          </tbody>
        </table>
        <OfficeTicketsView excursionId={excursionData.id} />
      </div>
    </div>
  );
}
