import React from 'react';

import TicketInfo from './TicketInfo';

export const ticketsInfo = [
  {
    type: 'fullcost',
    title: 'Взрослый билет',
    description: '',
    price: 400,
    color: '#3E66FB',
  },
  {
    type: 'discount',
    title: 'Льготный билет',
    description: 'Школьники, студенты, инвалиды, пенсионеры',
    price: 300,
    color: '#4DCD80',
  },
  {
    type: 'free',
    title: 'Дети до 5 лет',
    description: '',
    price: 0,
    color: '#F081D8',
  },
];

export default function TicketsInfo({title, description, price}) {

  return (
    <div className="tickets-info">
      {ticketsInfo.map(ticket => (
        <TicketInfo {...ticket} key={ticket.type}/>
      ))}
    </div>
    );
}
