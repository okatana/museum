import React, {useEffect, useState} from 'react';
import {getExcursionOfficeTickets} from '../../api';
import OfficeTicketsForm from './OfficeTicketsForm';

export default function OfficeTicketsView({excursionId}) {
  const [officeTickets, setOfficeTickets] = useState({
    fullcost_tickets: '',
    discount_tickets: '',
    free_tickets: '',
    participants_limit: 0,
    site_tickets: 0
  });

  useEffect(() => {
    getExcursionOfficeTickets(excursionId)
      .then(data => {
        console.log('getExcursionOfficeTickets', data);
        setOfficeTickets(data);
      });
  }, []);

  const availableTickets = () => (
    officeTickets.participants_limit > 0 ?
      officeTickets.participants_limit
      - officeTickets.fullcost_tickets - officeTickets.discount_tickets - officeTickets.free_tickets
      - officeTickets.site_tickets : ''
  );

  const onUpdated = () => {
    getExcursionOfficeTickets(excursionId)
      .then(data => {
        console.log('getExcursionOfficeTickets', data);
        setOfficeTickets(data);
      });
  }

  return (
    <div className="office-tickets">
      <h3>Продажа через кассу</h3>
      <div className="office-sold">
        <div><b>Продано</b></div>
        <div>полных: {officeTickets.fullcost_tickets}</div>
        <div>льготных: {officeTickets.discount_tickets}</div>
        <div>бесплатных: {officeTickets.free_tickets}</div>
      </div>
      <OfficeTicketsForm excursionId={excursionId} availableTickets={availableTickets()} onUpdated={onUpdated}/>
    </div>
  );
}
