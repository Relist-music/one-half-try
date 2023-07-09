import { HStack } from '@/styled-system/jsx';

const Controls = () => {
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
};

export default Controls;
