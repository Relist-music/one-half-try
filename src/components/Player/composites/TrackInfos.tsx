import { useState } from 'react';

import Marquee from 'react-fast-marquee';

import { css } from '@/styled-system/css';
import { HStack } from '@/styled-system/jsx';

interface InfosProps {
  title: string;
  artist: string;
  album: string;
}

const Infos = ({
  title,
  artist,
  album,
  expanded,
}: InfosProps & { expanded: boolean }) => {
  return (
    <>
      {!expanded ? (
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
            <span className="track-infos__text__title">{title}</span>
            <span>/</span>
            <span className="track-infos__text__artist">{artist}</span>
            <span>/</span>
            <span className="track-infos__text__album">{album}</span>
          </div>
        </Marquee>
      ) : (
        <>
          <div>{title}</div>
          <div>{artist}</div>
          <div>{album}</div>
        </>
      )}
    </>
  );
};

const Trackinfos = () => {
  const [title, artist, album] = ['Decrescendo', 'Lomepal', 'Mauvais ordre'];
  const [expanded, setExpaded] = useState(false);
  return (
    <HStack
      className={css({
        maxWidth: '100%',
      })}
    >
      <div onClick={() => setExpaded((expanded) => !expanded)}>
        {!expanded ? '▶️' : '🔽'}
      </div>
      <div
        className={css({
          maxWidth: '500px',
        })}
      >
        <Infos
          title={title}
          artist={artist}
          album={album}
          expanded={expanded}
        />
      </div>
    </HStack>
  );
};

export default Trackinfos;
