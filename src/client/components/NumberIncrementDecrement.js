import React, {useState} from 'react';

import CharButton from './CharButton';

export default function NumberIncrementDecrement({value, min, max, onChange}) {
  const [val, setVal] = useState(Math.round(value));
  const onClick = (change) => {
    setVal(val + change);
    onChange(val + change);
  };
  return (
    <div className="number-inc-dec">
      <CharButton disabled={val <= min} onClick={() => onClick(- 1)}>-</CharButton>
      <span >{val}</span>
      <CharButton disabled={val >= max} onClick={() => onClick(+ 1)}>+</CharButton>
    </div>
  );
}
