import React, {useState, useEffect} from 'react';
import FormTextElement from '../../components/form/FormTextElement';
import FormTextAreaElement from '../../components/form/FormTextAreaElement';

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
  const [intervalMinutes, setIntervalMinutes] = useState(0);
  const [error, setError] = useState('');

  const [ready, setReady] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const oldReady = ready;
    const newReady = name.trim().length>0 && timeStart.trim().length>0 && timeEnd.trim().length>0
      && participants>0 && fullcost>0 && discount>0 && intervalMinutes;
    if (oldReady !== newReady) {
      setReady(newReady);
    }
  }, [name, participants, fullcost, discount, timeStart, timeEnd, intervalMinutes]);

  const validate = () => {
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {

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
          <FormTextElement label="время начала" required={true} defaultValue={timeStart}
                           placeholder="чч:мм" onChange={setTimeStart} />
          <FormTextElement label="время окончания" required={true} defaultValue={timeEnd}
                           placeholder="чч:мм" onChange={setTimeEnd} />
          <FormTextElement label="интервал" required={true} defaultValue={intervalMinutes}
                           onChange={setIntervalMinutes} />
          </>
        }
        <input type="submit" value="Сохранить" disabled={!ready}/>
      </form>
    </div>
  );
}
