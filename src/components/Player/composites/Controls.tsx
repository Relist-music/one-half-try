import { css } from '@/styled-system/css';
import { HStack } from '@/styled-system/jsx';

const Controls = ({ minimal = false }: { minimal?: boolean }) => {
  if (minimal) {
    return (
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div>⏪</div>
        <div>⏯️</div>
        <div>⏩</div>
      </div>
    );
  } else {
    return (
      <HStack gap="2">
        🔀
        <HStack gap="1">
          <div>⏪</div>
          <div>⏯️</div>
          <div>⏩</div>
        </HStack>
        🔁
      </HStack>
    );
  }
};

export default Controls;
