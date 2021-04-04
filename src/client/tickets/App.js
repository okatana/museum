import React from 'react';
import {observer} from 'mobx-react-lite';
//import '../../assets/css/style.css';
import {screens} from '../components/TicketsStore';
import DatesScreen from './screens/DatesScreen';
import TimesScreen from './screens/TimesScreen';
import OrderScreen from './screens/OrderScreen';
import OrderingScreen from './screens/OrderingScreen';

const App = observer(({store}) => {
  console.log('window.location', window.location);
  const {screen} = store;
  return (
    <div className="container">
      <h1>Экскурсия. Покупка билетов</h1>
      {screen === screens.DATES && <DatesScreen />}
      {screen === screens.TIMES && <TimesScreen />}
      {screen === screens.ORDER && <OrderScreen />}
      {screen === screens.ORDERING && <OrderingScreen />}
    </div>
  );
});

export default App;
