import React, {useState, useEffect} from 'react';
import FormTextElement from '../../components/form/FormTextElement';
import FormTextAreaElement from '../../components/form/FormTextAreaElement';
import ExcursionType from '../../api/ExcursionType';

export default function EscursionTypeForm({typeData}) {
  const [name, setName] = useState(typeData.name);
  const [description, setDescription] = useState(typeData.description);
  const [participants, setParticipants] = useState(typeData.participants);

  const options = JSON.parse(typeData.options);
  const {tickets, schedule} = options;
  const [fullcost, setFullcost] = useState(options.tickets.fullcost);
  const [discount, setDiscount] = useState(options.tickets.discount);

  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [interval, setInterval] = useState(0);
  const [date_from, setDateFrom] = useState(typeData.date_from);
  const [date_to, setDateTo] = useState(typeData.date_to);

  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeData.schedule_type === 'grid') {
      if (options.schedule) {
        setTimeStart(options.schedule.timeStart);
        setTimeEnd(options.schedule.timeEnd);
        setInterval(options.schedule.interval);
      }
    }
  }, []);

  useEffect(() => {
    const newReady = name.trim().length>0 && timeStart.trim().length>0 && timeEnd.trim().length>0
      && participants>0 && fullcost>0 && discount>0 && interval;
    if (ready !== newReady) {
      setReady(newReady);
    }
  }, [name, participants, fullcost, discount, timeStart, timeEnd, interval]);

  const validate = () => {
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      let newOptions = {
        tickets: {fullcost, discount}
      };
      if (typeData.schedule_type === 'grid') {
        newOptions = {...newOptions, ...{schedule: {timeStart, timeEnd, interval}}};
      }
      const newTypeData = {
        name, description, participants, options: newOptions, date_from, date_to
      };
      ExcursionType.putExcursionType(typeData.id, newTypeData)
        .then(() => {
          setError('');
          //alert('ExcursionType updated!');
        })
        .catch(err => setError(err));
    }
  }

  return (
    <div className="excursion-type-form">
      <form onSubmit={handleSubmit}>
        <FormTextElement label="Наименование" required={true} onChange={setName} defaultValue={typeData.name}/>
        <FormTextAreaElement label="Описание" onChange={setDescription} defaultValue={typeData.description}/>
        <FormTextElement label="Участников" required={true} onChange={setParticipants} defaultValue={typeData.participants}/>
        <div className="form-element">Цена билета (руб.)</div>
        <FormTextElement label="полный" required={true} onChange={setFullcost} defaultValue={options.tickets.fullcost}/>
        <FormTextElement label="льготный" required={true} onChange={setDiscount} defaultValue={options.tickets.discount}/>
        <hr />
        <div className="form-element">
          <label>Тип расписания{<span className="required" />}: </label>
          <span>стандартное</span>
        </div>
        {typeData.schedule_type === 'grid' &&
          <>
          <FormTextElement label="время начала" required={true} value={timeStart}
                           placeholder="чч:мм" onChange={setTimeStart} />
          <FormTextElement label="время окончания" required={true} value={timeEnd}
                           placeholder="чч:мм" onChange={setTimeEnd} />
          <FormTextElement label="интервал" required={true} value={interval}
                           onChange={setInterval} />
          </>
        }
        <FormTextElement label="Действует с" onChange={setDateFrom} defaultValue={typeData.date_from}/>
        <FormTextElement label="Действует по" onChange={setDateTo} defaultValue={typeData.date_to}/>
        <input type="submit" className="button-fullscreen" value="Сохранить" disabled={!ready}/>
      </form>
      {error.length > 0 && <div className="error">{error}</div> }
    </div>
  );
}
