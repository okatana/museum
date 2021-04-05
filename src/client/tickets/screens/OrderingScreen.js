import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import {screens, store} from '../../components/TicketsStore';
import {dateWithWeekDay} from '../../utils';
import {TimeBilletPassive} from '../../components/TimeBilletPassive';
import {addParticipant} from '../../api';

function FormTextElement({label, required, onChange, defaultValue}) {

  return (
    <div className="form-element">
      <label>{label}{required && <span className="required" />}: </label>
      <input type="text" onChange={event => onChange(event.target.value)} defaultValue={defaultValue} />
    </div>
  );
}

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
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.ORDER)}}/>
        <h2 className="date-selected">{dateWithWeekDay(selectedDate)}</h2>
        {TimeBilletPassive({
          datetime: selectedExcursion.datetime,
          ticketsOrdered: ticketsOrdered,
        })}
        <span>{order.cost} руб.</span>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <FormTextElement label="Фамилия" required={true} onChange={setLastname}/>
          <FormTextElement label="Имя" required={true} onChange={setFirstname}/>
          <FormTextElement label="Отчество" onChange={setMidname}/>
          <FormTextElement label="Телефон" required={true} onChange={setPhone}/>
          <FormTextElement label="email" onChange={setEmail}/>
          <input type="submit" value="Заказать" disabled={!ready}/>
        </form>
      </div>
      <div className="message">
        {message.length > 0 && message}
      </div>
      {error.length > 0 && <div className="error">{error}</div>}
    </div>
  );
}
