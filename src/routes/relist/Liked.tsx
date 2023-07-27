import { useContext, useEffect, useState } from 'react';

import { Combobox } from '@headlessui/react';
import { Checkbox } from 'antd';
import prettyMilliseconds from 'pretty-ms';
import { useInView } from 'react-intersection-observer';

import TrackGenresCell from '@/components/Cells/TrackGenresCell';
import CountedGenres from '@/components/CountedGenres/CountedGenres';
import TrackSkeleton from '@/components/Track/composites/TrackSkeleton';

import useLiked from '@/hooks/useLiked';

import { PlaylistContext } from '@/contexts/PlaylistContext';
import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const PlaylistCombobox = () => {
  return (
    <Combobox value={''} onChange={() => undefined}>
      <Combobox.Input />
      <Combobox.Options></Combobox.Options>
    </Combobox>
  );
};

const Liked = () => {
  const { ref: thresholdRef, inView } = useInView({
    threshold: 0,
  });

  const [playlistOffset, setPlaylistOffset] = useState(0);
  const [playlistLimit] = useState(20);

  const {
    data: { items: fetchedTracks = [], limit = 20, offset = 0 } = {},
    isLoading,
    refetch,
  } = useLiked({
    offset: playlistOffset,
    limit: playlistLimit,
  });

  useEffect(() => {
    if (inView) {
      console.log('never');
      setPlaylistOffset((prevOffset) => {
        console.log('prev', prevOffset);
        return prevOffset + playlistLimit;
      });
      refetch();
    }
  }, [inView]);

  const { setTracks, tracks, filters, artists } = useContext(PlaylistContext);

  const filterTracks = () => {
    if (!filters.length) {
      return tracks;
    } else {
      return tracks.filter((track) => {
        const trackGenres = track.artists.reduce((acc, trackArtist) => {
          const artistSearch = artists.find((artist) => trackArtist.id === artist.id);
          if (artistSearch) {
            acc.push(...artistSearch.genres);
          }
          return acc;
        }, [] as string[]);
        if (filters.length && trackGenres.some((genre) => filters.includes(genre))) {
          return true;
        }
      });
    }
  };

  const filteredTracks = filterTracks();

  useEffect(() => {
    setTracks((prevTracks) => [...prevTracks, ...fetchedTracks.map(({ track }) => track)]);
  }, [fetchedTracks.length]);

  // if (inView) {
  //   refetch();
  // }

  return (
    <div>
      <h1
        className={css({
          fontSize: '4xl',
          marginBottom: '2',
        })}
      >
        Liked
      </h1>
      <div>
        <div>
          <h2>Filters</h2>
          <div>
            {filters.map((filter) => {
              return <Tag key={filter} label={filter} />;
            })}
          </div>
        </div>
        <hr />
        <br />
        <CountedGenres tracks={filteredTracks.map((track) => track)} />
        <PlaylistCombobox />
      </div>
      <br />
      <hr />
      <br />
      {(isLoading || fetchedTracks.length === 0) &&
        Array(20)
          .fill(0)
          .map((_, index) => <TrackSkeleton key={`${index}-track`} />)}

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '3',
        })}
      >
        {filteredTracks.map((track) => (
          <div
            key={`relist-track-${track.id}`}
            className={css({
              display: 'grid',
              gridTemplateColumns:
                'min-content minmax(80px,120px) 1fr 1fr max-content min-content',
              gap: '2',
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
              <img src={track.album.images.at(0)?.url} alt={`image of ${track.album.name}`} />
            </div>

            <div>
              <h2>{track.name}</h2>
              <p>{track.artists.map((artist) => artist.name).join(', ')}</p>
              <span>{track.album.name}</span>
            </div>

            <div>
              <TrackGenresCell artistIds={track.artists.map((artist) => artist.id)} />
            </div>

            <div>
              <h2>
                {prettyMilliseconds(track.duration_ms, {
                  keepDecimalsOnWholeSeconds: true,
                  secondsDecimalDigits: 0,
                }).replace(/ /, '')}
              </h2>
            </div>

            <div>❤️</div>
          </div>
        ))}
        <div
          id="placerholder-wrapper"
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '2',
          })}
          ref={thresholdRef}
        >
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TrackSkeleton key={`placeholder${index}`} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Liked;
