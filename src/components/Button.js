import { useContext } from 'react';
import { CalcContext } from '../context/CalcContext';

const getName = btn => {
  const classNameBtn = {
    '=': 'equals',
    '+': 'operator',
    '-': 'operator',
    x: 'operator',
    '/': 'operator',
    '+/-': 'operator',
    AC: 'operator',
    '%': 'operator'
  };

  return classNameBtn[btn];
};

export default function Button({ value }) {
  const { calc, setCalc } = useContext(CalcContext);

  function digitsClick() {
    const valueToString = value.toString();

    setCalc({
      ...calc,
      num:
        calc.num === 0 && valueToString === '0'
          ? '0'
          : calc.num % 1 === 0 && !calc.num.toString().includes('.')
          ? Number(calc.num + valueToString)
          : calc.num + valueToString,
      res: !calc.sign ? 0 : calc.res
    });
  }

  function resetClick() {
    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res: 0
    });
  }

  function invertClick() {
    setCalc({
      ...calc,
      sign: '',
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0
    });
  }

  function percentClick() {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: num / 100,
      res: res / 100,
      sign: ''
    });
  }

  function signClick() {
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    });
  }

  function commaClick() {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
    });
  }

  function equalsClick() {
    if (calc.num && calc.res) {
      const mathCalculation = (a, b, sign) => {
        return sign === '+'
          ? a + b
          : sign === '-'
          ? a - b
          : sign === 'x'
          ? a * b
          : a / b;
      };

      setCalc({
        ...calc,
        sign: '',
        res:
          calc.num === '0' && calc.sign === '/'
            ? 'Can`t divide with 0'
            : mathCalculation(Number(calc.res), Number(calc.num), calc.sign),
        num: 0
      });
    }
  }

  return (
    <button
      className={`${getName(value)} button`}
      onClick={
        value === 'AC'
          ? resetClick
          : value === '+/-'
          ? invertClick
          : value === '%'
          ? percentClick
          : value === '/' || value === 'x' || value === '-' || value === '+'
          ? signClick
          : value === '.'
          ? commaClick
          : value === '='
          ? equalsClick
          : digitsClick
      }
    >
      {value}
    </button>
  );
}
