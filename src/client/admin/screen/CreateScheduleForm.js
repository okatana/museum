import React, {useState, useEffect} from 'react';
import FormTextElement from '../../components/form/FormTextElement';
import {addScheduledExcurions} from '../../api';
import DatePickerElement from '../../components/form/DatePickerElement';
import {formatDate} from '../../utils';

export default function CreateScheduleForm({typeId}) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newReady = !!dateFrom;
    if (ready !== !!dateFrom) {
      setReady(newReady);
    }
  }, [dateFrom, dateTo]);

  const validate = () => {
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      //.toISOString().slice(0, 10)
      console.log('dates', dateFrom, dateTo);
      addScheduledExcurions({
        typeId,
        dateFrom: formatDate(dateFrom),
        dateTo: dateTo ? formatDate(dateTo) : dateFrom,
      }).then(response => {
        //console.log('response=', response);
        setMessage('Добавлено экскурсий '+response);
      })
    }
  }

  return (
    <div className="create-schedule-form">
      <form onSubmit={handleSubmit}>
        <div className="create-schedule-form-dates">
          <DatePickerElement label="Дата с (на)" required={true} onChange={setDateFrom} value={dateFrom}/>
          <DatePickerElement label="Дата с по" onChange={setDateTo} value={dateTo}/>
        </div>
        <input type="submit" className="button-fullscreen" value="Создать" disabled={!ready}/>
      </form>
      {error.length > 0 && <div className="error">{error}</div>}
      {message.length > 0 && <div className="message">{message}</div>}
    </div>
  );
}
