import React from 'react';
import {observer} from 'mobx-react-lite';
//import '../../assets/css/style.css';
import {screens} from '../components/TicketsStore';
import DatesScreen from './screens/DatesScreen';
import TimesScreen from './screens/TimesScreen';

const App = observer(({store}) => {
  const {screen} = store;
  return (
    <div className="container">
      <h1>Экскурсия. Покупка билетов</h1>
      {screen === screens.DATES && <DatesScreen />}
      {screen === screens.TIMES && <TimesScreen />}
    </div>
  );
});

export default App;
