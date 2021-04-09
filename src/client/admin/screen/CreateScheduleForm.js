import React, {useState, useEffect} from 'react';
import FormTextElement from '../../components/form/FormTextElement';
import {addScheduledExcurions} from '../../api';


export default function CreateScheduleForm({typeId}) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newReady = dateFrom.trim().length>0;
    if (ready !== dateFrom.trim().length>0) {
      setReady(newReady);
    }
  }, [dateFrom, dateTo]);

  const validate = () => {
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      addScheduledExcurions({
        typeId, dateFrom,
        dateTo: dateTo.length>0 ? dateTo : dateFrom,
      }).then(message => {
        setMessage(message);
      })
    }
  }

  return (
    <div className="create-schedule-form">
      <form onSubmit={handleSubmit}>
        <div className="create-schedule-form-dates">
          <FormTextElement label="Дата с (на)" required={true} onChange={setDateFrom}
                           placeholder="гггг-мм-дд" value={dateFrom}/>
          <FormTextElement label="Дата по" onChange={setDateTo}
                           placeholder="гггг-мм-дд" value={dateTo}/>
        </div>
        <input type="submit" value="Создать" disabled={!ready}/>
      </form>
      {error.length > 0 && <div className="error">{error}</div>}
      {message.length > 0 && <div className="message">{message}</div>}
    </div>
  );
}
