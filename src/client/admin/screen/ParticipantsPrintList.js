import React, {Fragment, useState} from 'react';

import {getParticipantsList} from '../../api';

export class ParticipantsPrintList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.date = props.date;
    this.state = {times: []};
  }

  componentDidMount() {
    getParticipantsList(this.date)
      .then(data => {
        console.log('getParticipantsList', data);
        //setParticipantsData(data);
        this.parse(data);
      })
  };

  parse(data) {
    let time = '';
    let times = [];
    let timeList = [];
    data.forEach(item => {
      if (item.time !== time) {
        if (timeList.length > 0) {
          times.push({time, list: [...timeList]});
        }
        timeList = [];
        time = item.time;
      }
      timeList.push(item);
    });
    if (timeList.length > 0) {
      times.push({time, list: [...timeList]});
    }
    console.log('times=', times);
    this.setState({times});
/*
    data.reduce((acc, cur) => {
      if (cur.time !== _time) {

      }
    }, [])
*/
  }

  getFio(item) {
    return item.lastname + ' ' + item.firstname + ' ' + item.midname;
  }
  getPhoneEmail(item) {
    return item.phone + ' ' + item.email;
  }

  render() {
    return (
      <div className="participants-print-list">
        <h1>Список участников на {this.date}</h1>
        <div className="print-table">
          <table>
            <thead>
              <tr>
                <th>Ф.И.О.</th>
                <th>Телефон, email</th>
                <th>полных</th>
                <th>льготных</th>
                <th>бесплатных</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.times.map(timeObj => (
                <Fragment key={timeObj.time}>
                  <tr key={timeObj.time}>
                    <td colSpan={5} className="td-time">{timeObj.time}</td>
                  </tr>
                  {timeObj.list.map(item => (
                    <tr key={item.id}>
                      <td>{this.getFio(item)}</td>
                      <td>{this.getPhoneEmail(item)}</td>
                      <td>{item.fullcost_tickets}</td>
                      <td>{item.discount_tickets}</td>
                      <td>{item.free_tickets}</td>
                    </tr>
                  ))}
                </Fragment>
              ))
            }

            </tbody>
          </table>
        </div>
      </div>
    )
  };
}