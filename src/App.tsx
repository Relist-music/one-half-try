import { css } from '@/styled-system/css';

import Temp from './page/Temp';

function App() {
  return (
    <div
      className={css({
        bg: 'black',
        height: '100vh',
      })}
    >
      <Temp />
    </div>
  );
}

export default App;
