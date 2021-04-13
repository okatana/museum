import React, {useState, useEffect} from 'react';
import {ticketsInfo} from '../../components/TicketsInfo';
import NumberIncrementDecrement from '../../components/NumberIncrementDecrement';
import {sellOfficeTickets} from '../../api';
import ExcursionType from '../../api/ExcursionType';


function TicketSelect({title, price, max, color, onChange, defaultValue=0}) {
  //const clr = "#3E66FB";
  return (
    <div className="ticket-select">
      <div className="ticket-select-color" style={{backgroundColor: color}}></div>
      <p>{title} ({price} руб.)</p>
      <NumberIncrementDecrement min={0} max={max} value={defaultValue} onChange={onChange} />
    </div>
  );
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

export default function OfficeTicketsForm({excursionId, availableTickets, onUpdated}) {
  console.log('OfficeTicketsForm() availableTickets=', availableTickets);
  const noTickets = {
    fullcost: 0,
    discount: 0,
    free: 0,
  }
  const [tickets, setTickets] = useState(noTickets);
  const [ticketsLeft, setTicketsLeft] = useState(availableTickets);
  const [cost, setCost] = useState(0);
  const onChange = (type, value) => {
    console.log('onChange() type=', type, 'value=', value);
    setTickets({...tickets, ...{[type]: value}});
  }
  const ticketsSelected = () => Object.values(tickets).reduce((acc, cur) => {
    return acc + cur;
  }, 0)
  useEffect(() => {
    console.log('useEffect()', availableTickets, availableTickets - tickets.fullcost - tickets.discount - tickets.free);
    setTicketsLeft(availableTickets - tickets.fullcost - tickets.discount - tickets.free);
    setCost(ticketsInfo.reduce((acc, cur) => {
      return acc + cur.price * tickets[cur.type];
    }, 0));
  }, [availableTickets, tickets]);

  const forceUpdate = useForceUpdate();

  const sellTickets = () => {
    sellOfficeTickets(excursionId, tickets)
      .then(() => {
        setTickets(noTickets);
        forceUpdate();
        onUpdated();
      })
  }

  return (
    <div className="office-tickets-form">
      <h2>Доступно билетов - {availableTickets}</h2>
      {ticketsInfo.map(ticketInfo => (
        <TicketSelect key={ticketInfo.type}
                      title={ticketInfo.title}
                      price={ticketInfo.price}
                      color={ticketInfo.color}
                      max={ticketsLeft+tickets[ticketInfo.type]}
                      onChange={(value) => onChange(ticketInfo.type, value)}
                      defaultValue={tickets[ticketInfo.type]}
        />
      ))}
      <div className="tickets-stats">
        <span>{cost} руб.</span>
        <span>Осталось {ticketsLeft} билетов</span>
      </div>
      <button className="checkout-button" disabled={ticketsSelected() === 0} onClick={sellTickets}>
        Продать
      </button>
    </div>
  );
}