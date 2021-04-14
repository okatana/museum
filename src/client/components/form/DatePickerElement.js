import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru)

export default function DatePickerElement({label, required=false, onChange, value=null}) {

  return (
    <div className="form-element">
      <label>{label}{required && <span className="required" />}: </label>
      <DatePicker selected={value} onChange={date => onChange(date)} locale="ru" dateFormat="yyyy-MM-dd"/>
    </div>
  );
}