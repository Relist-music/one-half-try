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
          p: '2px',
          width: '100%',
          height: 'min-content',
        })}
      >
        <div
          className={css({
            width: '100%',
            height: '4px',
            rounded: 'sm',
            _hover: {
              bg: 'grey.400',
            },
          })}
        />
      </div>
    </PanelResizeHandle>
  );
};

export default HorizontalHandle;
