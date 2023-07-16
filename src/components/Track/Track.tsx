import { Checkbox } from 'antd';

import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

import TrackSkeleton from './composites/TrackSkeleton';

const Track = () => {
  const hasLoaded = Math.random() > 0.5;
  return (
    <>
      {hasLoaded ? (
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns:
              'min-content minmax(80px,120px) 1fr 1fr max-content min-content',
          })}
        >
          <div
            className={css({
              paddingInline: '2',
              display: 'flex',
              alignItems: 'center',
              _hover: {
                bg: '#28333799',
              },
            })}
          >
            <Checkbox />
          </div>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
              alt=""
              className={css({
                maxWidth: '100px',
              })}
            />
          </div>
          <div>
            <span className="title">
              Flute Concerto in D Major: III. Allegro
            </span>
            <div className="authors">
              <span>Giuseppe Tartini</span>
              <span>Raffaele Trevisani</span>
            </div>
            <span className="album">
              Albinoni, T.G.: Flute Concerto, Op. 9, No. 6 ...
            </span>
          </div>
          <div
            className={css({
              display: 'flex',
              gap: '2',
              alignItems: 'flex-start',
            })}
          >
            {['baroque', 'classical', 'concerto'].map((label, index) => (
              <Tag
                key={`${index}-tag`}
                label={label}
                background="#F4F2EA"
                color="735A13"
              />
            ))}
          </div>
          <div className={css({ display: 'flex', alignItems: 'center' })}>
            <span>2m 44s</span>
          </div>
          <div
            className={css({
              padding: '2',
              display: 'flex',
              alignItems: 'center',
            })}
          >
            <span>❤️</span>
          </div>
        </div>
      ) : (
        <>
          <TrackSkeleton />
        </>
      )}
    </>
  );
};

export default Track;
