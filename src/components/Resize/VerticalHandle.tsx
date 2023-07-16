import { PanelResizeHandle } from 'react-resizable-panels';
import { v4 as uuidv4 } from 'uuid';

import { css } from '@/styled-system/css';
import { PropertyValue } from '@/styled-system/types/prop-type';

const VerticalHandle = ({
  width = '4px',
}: {
  width?: PropertyValue<'width'>;
}) => {
  const id = uuidv4();
  return (
    <PanelResizeHandle id={`resize-handle-${id}`}>
      <div
        className={css({
          p: '2px',
          height: '100%',
          width: 'min-content',
        })}
      >
        <div
          className={css({
            width: '4px',
            height: '100%',
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

export default VerticalHandle;
