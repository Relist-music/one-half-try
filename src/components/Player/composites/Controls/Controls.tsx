import { css } from '@/styled-system/css';

const cursorable = css({
  cursor: 'pointer',
  lineHeight: '1',
});

const Controls = () => {
  return (
    <div
      className={css({
        containerType: 'inline-size',
        width: '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          gap: '2',
          justifyContent: 'center',
          '@container (max-width: 120px)': {
            flexDirection: 'column',
            gap: '1',
          },
        })}
      >
        <span className={cursorable}>🔀</span>
        <div
          className={css({
            display: 'flex',
            gap: '1',
            '@container (max-width: 120px)': {
              flexDirection: 'column',
              gap: '0.5',
            },
          })}
        >
          <span className={cursorable}>⏪</span>
          <span className={cursorable}>⏯️</span>
          <span className={cursorable}>⏩</span>
        </div>
        <span className={cursorable}>🔁</span>
      </div>
    </div>
  );
};

export default Controls;
