import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
//import '../../assets/css/style.css';
import {screens} from '../components/AdminStore';
import AdminDatesScreen from './screen/AdminDatesScreen';
import AdminTimesScreen from './screen/AdminTimesScreen';
import AdminExcursionScreen from './screen/AdminExcursionScreen';
import AdminMainScreen from './screen/AdminMainScreen';
import AdminTypesScreen from './screen/AdminTypesScreen';
import AdminScheduleScreen from './screen/AdminScheduleScreen';

import ExcursionType from '../api/ExcursionType';
import '../styles/style.css';
import {Config} from '../config';

const App = observer(({store}) => {
  const [error, setError] = useState('');
  //const [excursionType, setExcursionType] = useState(null);
  useEffect(() => {
    const today = new Date();
    store.setSelectedDate(today.toISOString().slice(0, 10));
    ExcursionType.load(Config.excursionTypeId)
      .then(excursionType => {
        console.log('excursionType', excursionType);
        store.setExcursionType(excursionType);
        store.setScreen(screens.MAIN);
      })
      .catch(() => {
        setError(`Wrong excursionTypeId = ${Config.excursionTypeId}`);
      });
  }, []);
  //console.log(today.toISOString().slice(0, 10));
  //const {screen} = store;

  return (
    <div className="container container-admin">
      <h1>Экскурсии. Администрирование</h1>
      {error.length > 0 && <div className="error">{error}</div>}
      {store.screen === screens.MAIN && <AdminMainScreen />}
      {store.screen === screens.TYPES && <AdminTypesScreen />}
      {store.screen === screens.DATES && <AdminDatesScreen />}
      {store.screen === screens.TIMES && <AdminTimesScreen />}
      {store.screen === screens.EXCURSION && <AdminExcursionScreen />}
      {store.screen === screens.SCHEDULE && <AdminScheduleScreen />}
    </div>
  );
});

export default App;
