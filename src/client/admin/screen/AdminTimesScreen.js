import React, {useEffect, useState, useRef} from 'react';
import {useReactToPrint} from 'react-to-print';

import {Config} from '../../config';
import {store, screens} from '../../components/AdminStore';
import {dateWithWeekDay, formatTime} from '../../utils';
import {getExcursionsForDateAdmin, getExcursionsForDateAdminAllTypes} from '../../api';
import BackButton from '../../components/BackButton';
import {ParticipantsPrintList} from './ParticipantsPrintList';

function TimeTableRow(timeData, onRowClick) {
  const ticketsCost = store.excursionType.getTicketsCost();
  //console.log(store.excursionType, ticketsCost);
  const {id, datetime, office_sold, site_sold, reserved, fullcost, discount, free} = timeData;
  const cost = Number(fullcost) * ticketsCost.fullcost + Number(discount) * ticketsCost.discount;
  return (
    <tr key={id} onClick={() => onRowClick({id, datetime})}>
      <td>{formatTime(datetime)}</td>
      <td>{Number(office_sold) + Number(site_sold)}</td>
      <td>{office_sold}</td>
      <td>{site_sold}</td>
      <td>{reserved}</td>
      <td>{fullcost}</td>
      <td>{discount}</td>
      <td>{free}</td>
      <td>{cost}</td>
    </tr>
  );
}

export default function AdminTimesScreen() {
  const componentRef = useRef();
  const selectedDate = store.selectedDate;
  const [timesData, setTimesData] = useState([]);
  useEffect(() => {
    getExcursionsForDateAdmin(Config.excursionTypeId, selectedDate)
      .then(data => {
        //console.log('getExcursionsForDateAdmin', data);
        setTimesData(data);
      });
/*
    getExcursionsForDateAdminAllTypes(selectedDate)
      .then(data => {
        //console.log('getExcursionsForDateAdmin', data);
        setTimesData(data);
      });
*/
  }, []);

  const onRowClick = (excursionData) => {
    console.log('onRowClick ', excursionData);
    store.setExcursionData(excursionData);
    store.setScreen(screens.EXCURSION);
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="times-screen">
      <div style={{display: "none"}}>
        <ParticipantsPrintList ref={componentRef} date={selectedDate}/>
      </div>
      <div className="navigation">
        <BackButton onClick={() => {store.setScreen(screens.MAIN)}}/>
        <h2 className="date-selected">{dateWithWeekDay(selectedDate)}</h2>
        <button type="button" onClick={handlePrint}>????????????</button>
      </div>
      <h3>?????????????????? ????????????</h3>
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>??????????</th>
              <th colSpan={8}>?????????????? ??????????????</th>
            </tr>
            <tr>
              <th>??????????</th>
              <th>?? ??????????</th>
              <th>???? ??????????</th>
              <th>????????????</th>
              <th>????????????</th>
              <th>????????????????</th>
              <th>????????????????????</th>
              <th>??????????????????</th>
            </tr>
          </thead>
          <tbody>
          {timesData.map(timeData => TimeTableRow(timeData, onRowClick))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
