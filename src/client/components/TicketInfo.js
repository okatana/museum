import React from 'react';

//import '../styles/style.css';

export default function TicketInfo({type, title, description, price}) {
  const typeClassName = 'ticket-info-' + type;
  return (
    <div className={`ticket-info ${typeClassName}`}>
      <div className='img-icon'></div>
      <h3>{title}</h3>
      <div className="ticket-description">{description}</div>
      <div className="ticket-price">
        {price > 0 && <span>{price} рублей</span>}
        {price == 0 && <span>бесплатно</span>}
      </div>
    </div>
  );
}