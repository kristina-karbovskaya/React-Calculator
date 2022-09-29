import { useContext } from 'react';
import { Textfit } from 'react-textfit';
import { CalcContext } from '../context/CalcContext';

export default function Screen() {
  const { calc } = useContext(CalcContext);

  return (
    <Textfit className='screen' mode='single' max={70}>
      {calc.num ? calc.num : calc.res}
    </Textfit>
  );
}
