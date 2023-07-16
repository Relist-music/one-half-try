import { css } from '@/styled-system/css';
import { Container } from '@/styled-system/jsx/container';

import Track from '../Track/Track';

const Main = () => {
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
          id="spacing"
          className={css({
            height: '100px',
            width: '100%',
            bg: 'grey.400',
            p: '2',
            rounded: 'md',
          })}
        >
          lorem
        </div>
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

export default Main;
