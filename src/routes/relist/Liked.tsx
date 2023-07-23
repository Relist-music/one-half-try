import { useContext, useEffect } from 'react';

import { Combobox } from '@headlessui/react';
import { Checkbox } from 'antd';
import prettyMilliseconds from 'pretty-ms';

import TrackGenresCell from '@/components/Cells/TrackGenresCell';
import CountedGenres from '@/components/CountedGenres/CountedGenres';
import TrackSkeleton from '@/components/Track/composites/TrackSkeleton';

import useInfiniteArtists from '@/hooks/useInfinityArtists';
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
  const { data: { items: tracks = [], limit } = {}, isLoading } = useLiked();
  const { setTracks, setArtists, filters, artists } = useContext(PlaylistContext);

  const filterTracks = () => {
    console.log(1);
    if (!filters.length) {
      console.log(2);
      return tracks;
    } else {
      console.log(3);
      return tracks.filter(({ track }) => {
        console.log('here', track.artists);
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

  console.log('tracks', tracks);

  const filteredTracks = filterTracks();
  console.log('filteredTracks', filteredTracks, filters);
  const artistIds = tracks
    .map(({ track }) => {
      return track.artists.map((artist) => artist.id);
    })
    .flat();

  const artistsData = useInfiniteArtists({ artistIds });

  useEffect(() => {
    setTracks(tracks.map(({ track }) => track) ?? []);
    setArtists(artistsData.map(({ data }) => data ?? ({} as SpotifyApi.SingleArtistResponse)));
  }, [tracks.length]);

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
        <CountedGenres tracks={tracks.map(({ track }) => track)} />
        <PlaylistCombobox />
      </div>
      <br />
      <hr />
      <br />
      {isLoading &&
        Array(10)
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
            key={`relist-track-${track.track.id}`}
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
              <img
                src={track.track.album.images.at(0)?.url}
                alt={`image of ${track.track.album.name}`}
              />
            </div>

            <div>
              <h2>{track.track.name}</h2>
              <p>{track.track.artists.map((artist) => artist.name).join(', ')}</p>
              <span>{track.track.album.name}</span>
            </div>

            <div>
              <TrackGenresCell artistIds={track.track.artists.map((artist) => artist.id)} />
            </div>

            <div>
              <h2>
                {prettyMilliseconds(track.track.duration_ms, {
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
