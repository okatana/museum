import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
//import '../../assets/css/style.css';
import {screens} from '../components/AdminStore';
import AdminDatesScreen from './screen/AdminDatesScreen';
import AdminTimesScreen from './screen/AdminTimesScreen';
import AdminExcursionScreen from './screen/AdminExcursionScreen';
import ExcursionType from '../api/ExcursionType';
import '../styles/style.css';
import {Config} from '../config';

const App = observer(({store}) => {
  const [error, setError] = useState('');
  //const [excursionType, setExcursionType] = useState(null);
  useEffect(() => {
    ExcursionType.load(Config.excursionTypeId)
      .then(excursionType => {
        console.log('excursionType', excursionType);
        store.setExcursionType(excursionType);
        store.setScreen(screens.TIMES);
      })
      .catch(() => {
        setError(`Wrong excursionTypeId = ${Config.excursionTypeId}`);
      });
  }, []);
  const today = new Date();
  console.log(today.toISOString().slice(0, 10));
  store.setSelectedDate(today.toISOString().slice(0, 10));
  //const {screen} = store;

  return (
    <div className="container">
      <h1>Экскурсия. Администрирование</h1>
      {error.length > 0 && <div className="error">{error}</div>}
      {store.screen === screens.DATES && <AdminDatesScreen />}
      {store.screen === screens.TIMES && <AdminTimesScreen />}
      {store.screen === screens.EXCURSION && <AdminExcursionScreen />}
    </div>
  );
});

export default App;
