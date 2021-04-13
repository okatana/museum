import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/TicketsStore';
import {dateWithWeekDay} from '../../utils';
import {TimeBilletPassive} from '../../components/TimeBilletPassive';
import {addParticipant} from '../../api';
import FormTextElement from '../../components/form/FormTextElement';
import TicketsInfo from '../../components/TicketsInfo';

export default function OrderingScreen() {
  const {selectedDate, selectedExcursion, ticketsOrdered, order} = store;
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [midname, setMidname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const newReady = lastname.trim().length > 0
                  && firstname.trim().length > 0
                  && phone.trim().length > 0
                  && message.length == 0
                  && error.length == 0;
    if (ready !== newReady) {
      setReady(newReady);
    }
  }, [lastname, firstname, phone, message, message]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const participantOrder = {excursion_id: selectedExcursion.id, lastname, firstname, midname, phone, email, ...order};
    console.log('participantOrder=', participantOrder);
    setReady(false);
    const promise = addParticipant(participantOrder);
    console.log('promise=', promise);
    promise  .then(() => {
        setMessage(`Ваши билеты зарезервированы за Вами.
При посещении обратитесь к контролеру и сообщите ваши ФИО и номер телефона.`);
      })
      .catch(e => {console.error(e)});
  }

  return (
    <div className="ordering-screen">
      <TicketsInfo/>
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.ORDER)}}/>
        <h3 className="date-selected">{dateWithWeekDay(selectedDate)}</h3>
        {TimeBilletPassive({
          datetime: selectedExcursion.datetime,
          ticketsOrdered: ticketsOrdered,
        })}
        <h2>{order.cost} <span class="valuta-icon">₽</span></h2>
      </div>
      <div className="form">
        <h2>Укажите Ваши контактные данные</h2>
        <form onSubmit={handleSubmit}>
          <FormTextElement label="Фамилия" required={true} onChange={setLastname}/>
          <FormTextElement label="Имя" required={true} onChange={setFirstname}/>
          <FormTextElement label="Отчество" onChange={setMidname}/>
          <FormTextElement label="Телефон" required={true} onChange={setPhone}/>
          <FormTextElement label="email" onChange={setEmail}/>
          <input  className="submit-button" type="submit" value="Заказать" disabled={!ready}/>
        </form>
      </div>
      <div className="message">
        {message.length > 0 && message}
      </div>
      {error.length > 0 && <div className="error">{error}</div>}
    </div>
  );
}
