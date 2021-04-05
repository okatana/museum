import React, {useEffect, useState} from 'react';

import {Config} from '../../config';
import {store, screens} from '../../components/AdminStore';
import {dateWithWeekDay, formatTime} from '../../utils';
import {getExcursionsForDateAdmin} from '../../api';

function TimeTableRow(timeData) {
  const {datetime, office_sold, site_sold, reserved, fullcost, discount, free} = timeData;
  return (
    <tr key={datetime}>
      <td>{formatTime(datetime)}</td>
      <td>{Number(office_sold) + Number(site_sold)}</td>
      <td>{office_sold}</td>
      <td>{site_sold}</td>
      <td>{reserved}</td>
      <td>{fullcost}</td>
      <td>{discount}</td>
      <td>{free}</td>
      <td></td>
    </tr>
  );
}

export default function AdminTimesScreen() {
  const selectedDate = store.selectedDate;
  const [timesData, setTimesData] = useState([]);
  useEffect(() => {
    getExcursionsForDateAdmin(Config.excursionTypeId, selectedDate)
      .then(data => {
        //console.log('getExcursionsForDateAdmin', data);
        setTimesData(data);
      })
  }, []);

  return (
    <div className="times-screen">
      <div className="navigation">
        <div></div>
        <h2 className="date-selected">{dateWithWeekDay(selectedDate)}</h2>
        <div></div>
      </div>
      <h3>Проданные билеты</h3>
      <div className="timesTable">
        <table>
          <thead>
            <tr>
              <th rowSpan={2}>Время</th>
              <th colSpan={8}>Билетов</th>
            </tr>
            <tr>
              <th>всего</th>
              <th>в кассе</th>
              <th>на сайте</th>
              <th>резерв</th>
              <th>полных</th>
              <th>льготных</th>
              <th>бесплатных</th>
              <th>стоимость</th>
            </tr>
          </thead>
          <tbody>
          {timesData.map(timeData => TimeTableRow(timeData))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
