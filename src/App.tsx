import { css } from '@/styled-system/css';

import Relist from './pages/Relist';

function App() {
  return (
    <div
      className={css({
        bg: 'black',
        height: '100vh',
      })}
    >
      <Relist />
    </div>
  );
}

export default App;
