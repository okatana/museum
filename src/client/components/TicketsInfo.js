import React from 'react';

import TicketInfo from './TicketInfo';

export const ticketsInfo = [
  {
    type: 'fullcost',
    title: 'Взрослый билет',
    description: '',
    price: 400,
    color: '#ffffff',
  },
  {
    type: 'discount',
    title: 'Льготный билет',
    description: 'Школьники, студенты, инвалиды, пенсионеры',
    price: 300,
    color: '#ffffff',
  },
  {
    type: 'free',
    title: 'Дети до 5 лет',
    description: '',
    price: 0,
    color: '#ffffff',
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
