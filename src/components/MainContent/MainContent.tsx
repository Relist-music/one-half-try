import { css } from '@/styled-system/css';
import { Container } from '@/styled-system/jsx/container';

import Track from '../Track/Track';

const MainContent = () => {
  return (
    <div
      className={css({
        p: '4',
        bg: 'primary',
        height: '100%',
        rounded: 'md',
        overflowY: 'scroll',
      })}
    >
      <Container>
        <h1
          className={css({
            fontSize: '4xl',
          })}
        >
          Main
        </h1>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8',
            paddingBlock: '4',
          })}
        >
          {Array(20)
            .fill(undefined)
            .map((_, index) => (
              <Track key={index} />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default MainContent;
