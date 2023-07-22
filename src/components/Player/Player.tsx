import { useRef } from 'react';

import {
  Controls,
  Leftover,
  ProgressBar,
  TrackInfos,
} from '@/components/Player/composites/';

import { css } from '@/styled-system/css';
import { VStack } from '@/styled-system/jsx';

export const Player = () => {
  const wrapperRef = useRef(null);
  return (
    <div
      className={css({
        width: '100%',
        height: '100%',
        bg: 'primary',
        p: '2.5',
        rounded: 'md',
        color: 'white',
        minHeight: '340px',
        containerType: 'inline-size',
      })}
      ref={wrapperRef}
    >
      <VStack
        className={css({
          overflow: 'hidden',
        })}
        gap="2"
      >
        <div
          className={css({
            width: '100%',
            '@container (max-width: 200px)': {
              display: 'none',
            },
          })}
        >
          <img
            className={css({ width: '100%', height: '100%' })}
            src="https://m.media-amazon.com/images/I/A1AT1xuPEDL._UF894,1000_QL80_.jpg"
            alt="cover mauvais ordre"
          />
        </div>

        <VStack
          gap="2"
          className={css({
            alignItems: 'center',
            width: '10/12',
          })}
        >
          <ProgressBar />
          <Controls />
          <TrackInfos />
          <Leftover />
        </VStack>
      </VStack>
    </div>
  );
};

export default Player;
