import Marquee from 'react-fast-marquee';

import { css } from '@/styled-system/css';
import { HStack } from '@/styled-system/jsx';

const Trackinfos = () => {
  return (
    <HStack>
      <div>▶️</div>
      <div
        className={css({
          maxWidth: '500px',
        })}
      >
        <Marquee
          speed={15}
          pauseOnHover={true}
          pauseOnClick={true}
          gradient={true}
          gradientColor={[27, 35, 38]}
          gradientWidth={10}
          autoFill={true}
        >
          <div
            className={css({
              margin: '2',
            })}
          >
            <span className="track-infos__text__title">Decrescendo</span>
            <span>/</span>
            <span className="track-infos__text__artist">Lomepal</span>
            <span>/</span>
            <span className="track-infos__text__album">Mauvais ordre</span>
          </div>
        </Marquee>
      </div>
    </HStack>
  );
};

export default Trackinfos;
