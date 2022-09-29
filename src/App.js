import CalcProvider from './context/CalcContext.js';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonsWrapper from './components/ButtonsWrapper';
import Button from './components/Button';

const btnValues = [
  ['AC', '+/-', '%', '/'],
  [7, 8, 9, 'x'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '=']
];

function App() {
  return (
    <CalcProvider>
      <Wrapper>
        <Screen />
        <ButtonsWrapper>
          {btnValues.flat().map((btn, i) => (
            <Button key={i} value={btn} />
          ))}
        </ButtonsWrapper>
      </Wrapper>
    </CalcProvider>
  );
}

export default App;
