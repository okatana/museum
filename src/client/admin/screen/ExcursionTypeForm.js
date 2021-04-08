import React, {useState} from 'react';
import FormTextElement from '../../components/form/FormTextElement';
import FormTextAreaElement from '../../components/form/FormTextAreaElement';

export default function EscursionTypeForm({typeData}) {
  const [name, setName] = useState(typeData.name);
  const [description, setDescription] = useState(typeData.description);
  const [ready, setReady] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="excursion-type-form">
      <form onSubmit={handleSubmit}>
        <FormTextElement label="Наименование" required={true} onChange={setName} defaultValue={typeData.name}/>
        <FormTextAreaElement label="Описание" onChange={setName} defaultValue={typeData.description}/>
        <input type="submit" value="Сохранить" disabled={!ready}/>
      </form>
    </div>
  );
}
