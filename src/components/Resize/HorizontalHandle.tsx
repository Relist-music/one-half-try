import { PanelResizeHandle } from 'react-resizable-panels';
import { v4 as uuidv4 } from 'uuid';

import { css } from '@/styled-system/css';
import { PropertyValue } from '@/styled-system/types/prop-type';

const HorizontalHandle = ({
  height = '1',
}: {
  height?: PropertyValue<'height'>;
}) => {
  const id = uuidv4();
  return (
    <PanelResizeHandle id={`resize-handle-${id}`}>
      <div
        className={css({
          width: '100%',
          height,
          _hover: {
            bg: 'grey.400',
          },
        })}
      />
    </PanelResizeHandle>
  );
};

export default HorizontalHandle;
