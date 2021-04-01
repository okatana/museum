import React, {useEffect, useState} from 'react';

import {Config} from '../../config';
import {store, screens} from '../../components/TicketsStore';
import {TimeBillet} from './TimesScreen';
import {dateWithWeekDay, formatTime} from '../../utils';
import BackButton from '../../components/BackButton';
import {ticketsInfo} from '../../components/TicketsInfo';
import NumberIncrementDecrement from '../../components/NumberIncrementDecrement';


function TicketSelect({title, price, max, color, onChange}) {
  //const clr = "#3E66FB";
  return (
    <div className="ticket-select">
      <div className="ticket-select-color" style={{backgroundColor: color}}></div>
      <p>{title} ({price} руб.)</p>
      <NumberIncrementDecrement min={0} max={max} value={0} onChange={onChange} />
    </div>
  );
}

export default function OrderScreen() {
  const selectedDate = store.selectedDate;
  const selectedExcursion = store.selectedExcursion;
  const {id, participants_limit, sold, reserved, datetime} = selectedExcursion;
  const available = Math.max(participants_limit - sold - reserved, 0);
/*
  const [fullcost, setFullcost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [free, setFree] = useState(0);
*/
  const [tickets, setTickets] = useState({
    fullcost: 0,
    discount: 0,
    free: 0,
  });
  const [ticketsLeft, setTicketsLeft] = useState(available);
  const [cost, setCost] = useState(0);
  const onChange = (type, value) => {
//    console.log('onChange() type=', type, 'value=', value);
    setTickets({...tickets, ...{[type]: value}});
/*
    switch (type) {
      case 'fullcost':
        setFullcost(value);
        break;
      case 'discount':
        setDiscount(value);
        break;
      case 'free':
        setFree(value);
        break;
    }
*/
  }
/*
  useEffect(() => {
    console.log('useEffect() fullcost=', fullcost);
    setTicketsLeft(available - fullcost - discount - free);
  }, [fullcost, discount, free]);
*/
  useEffect(() => {
//    console.log('useEffect() fullcost=', fullcost);
    setTicketsLeft(available - tickets.fullcost - tickets.discount - tickets.free);
    setCost(ticketsInfo.reduce((acc, cur) => {
      return acc + cur.price * tickets[cur.type];
    }, 0));
  }, [tickets]);
  return (
    <div className="order-screen">
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.TIMES)}}/>
        <h2 className="date-selected">{dateWithWeekDay(selectedDate)}</h2>
        {TimeBillet(selectedExcursion)}
      </div>
      <h3>Доступно билетов - {available}</h3>
      {ticketsInfo.map(ticketInfo => (
        <TicketSelect key={ticketInfo.type}
          title={ticketInfo.title}
          price={ticketInfo.price}
          color={ticketInfo.color}
          max={ticketsLeft+tickets[ticketInfo.type]} onChange={(value) => onChange(ticketInfo.type, value)} />
      ))}
      <div className="tickets-stats">
        <span>{cost} руб.</span>
        <span>Осталось {ticketsLeft} билетов</span>
      </div>
    </div>
  );
}