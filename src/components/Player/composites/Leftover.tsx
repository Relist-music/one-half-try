import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';
import { HStack } from '@/styled-system/jsx';

const Leftover = () => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2',
        maxWidth: '100%',
        '@container (max-width: 200px)': {
          display: 'none',
        },
      })}
    >
      <Tag label="rap" />
      <HStack
        gap={'1'}
        className={css({
          maxWidth: '100%',
        })}
      >
        <span>🔉</span>
        <input
          className={css({
            maxWidth: '100%',
          })}
          type="range"
          min="0"
          max="100"
        />
      </HStack>
    </div>
  );
};

export default Leftover;
