import React from 'react';
import {observer} from 'mobx-react-lite';
//import '../../assets/css/style.css';
import {screens} from '../components/AdminStore';
import AdminDatesScreen from './screen/AdminDatesScreen';
import AdminTimesScreen from './screen/AdminTimesScreen';

const App = observer(({store}) => {
  const today = new Date();
  console.log(today.toLocaleDateString('ru-RU'));
  const {screen} = store;
  return (
    <div className="container">
      <h1>Экскурсия. Администрирование</h1>
      {screen === screens.DATES && <AdminDatesScreen />}
      {screen === screens.TIMES && <AdminTimesScreen />}
    </div>
  );
});

export default App;
