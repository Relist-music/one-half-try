/* eslint-disable indent */
import { useEffect, useState } from 'react';

// import { useQueryClient } from '@tanstack/react-query';

import { Checkbox } from 'antd';
import prettyMilliseconds from 'pretty-ms';

import TrackGenresCell from '@/components/Cells/TrackGenresCell';
import CountedGenres from '@/components/CountedGenres/CountedGenres';
import ActiveFilters from '@/components/CurrentPlaylist/ActiveFilters';

import { fetchSpotifyWithRetry } from '@/services/fetchSpotify';
import { playOrResumeTrack } from '@/services/PlayResumePlayback';

import { css } from '@/styled-system/css';

const LIMIT = 50;

interface RelistTrack {
  added_at: string;
  track: SpotifyApi.TrackObjectFull & {
    detailArtists?: SpotifyApi.ArtistObjectFull[];
    genres?: string[];
  };
}

const Liked = () => {
  const [offset, setOffset] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [tracks, setTracks] = useState<RelistTrack[]>([]);

  useEffect(() => {
    setTracks([]);
    setFilters([]);
  }, []);

  useEffect(() => {
    (async () => {
      const { items = [] } = await fetchSpotifyWithRetry<SpotifyApi.UsersSavedTracksResponse>({
        url: `https://api.spotify.com/v1/me/tracks?limit=${LIMIT}&offset=${offset}`,
      });
      setTracks((prevTracks) => [...prevTracks, ...items]);

      items.map(async ({ track }) => {
        const artistsIds = track.artists.map((artist) => artist.id);
        const { artists } = await fetchSpotifyWithRetry<SpotifyApi.MultipleArtistsResponse>({
          url: `https://api.spotify.com/v1/artists?ids=${artistsIds.join(',')}`,
        });
        setTracks((prevTracks) =>
          prevTracks.map((stateTrack) =>
            stateTrack.track.id === track.id
              ? {
                  added_at: stateTrack.added_at,
                  track: {
                    ...track,
                    detailArtists: artists,
                    genres: Array.from(new Set(artists.map((artist) => artist.genres).flat())),
                  },
                }
              : stateTrack,
          ),
        );
      });
    })();
  }, [offset]);

  const filteredTracks = tracks.filter(({ track }) => {
    if (!track.detailArtists || filters.length === 0) return true;
    else {
      const genres = track.detailArtists.map((artist) => artist.genres).flat();
      return filters.some((filter) => genres.includes(filter));
    }
  });

  const countedGenresObject = filteredTracks.reduce(
    (acc: Record<string, number>, { track }) => {
      if (!track.genres) return acc;

      track.genres.forEach((genre) => {
        acc[genre] = acc[genre] ? acc[genre] + 1 : 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const addToFilters = (genre: string) => {
    setFilters((prev) => Array.from(new Set([...prev, genre])));
  };

  const removeFilter = (genre: string) => {
    setFilters((prev) => prev.filter((filter) => filter !== genre));
  };

  const playCurrentList = async (track: RelistTrack) => {
    const indexOfSelectedTrack = filteredTracks.findIndex(
      (filteredTrack) => filteredTrack.track.id === track.track.id,
    );
    const uris = filteredTracks
      .slice(indexOfSelectedTrack)
      .map((filteredTrack) => filteredTrack.track.uri);
    await playOrResumeTrack({
      uris,
    });
  };

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
      <p
        className={css({
          fontSize: '3xl',
          marginBottom: '2',
        })}
      >
        <ActiveFilters filters={filters} removeFilter={removeFilter} />
      </p>
      <hr
        className={css({
          marginBlock: '1',
        })}
      />

      <CountedGenres countedGenresObject={countedGenresObject} addToFilters={addToFilters} />
      <hr
        className={css({
          marginBlock: '1',
          marginBlockEnd: '4',
        })}
      />
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4',
        })}
      >
        {filteredTracks.length &&
          filteredTracks.map((relistTrack) => {
            const { added_at, track } = relistTrack;
            return (
              <div
                key={`relist-track-${track.id}`}
                className={css({
                  display: 'grid',
                  gridTemplateColumns:
                    'min-content minmax(80px,120px) 1fr 1fr max-content min-content',
                  gap: '2',
                })}
                onClick={() => {
                  console.log('play', relistTrack);
                  playCurrentList(relistTrack);
                }}
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
                  <TrackGenresCell
                    genres={track.genres}
                    track={{
                      id: track.id,
                      added_at: added_at,
                    }}
                  />
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
            );
          })}
      </div>
      <br />
      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <button
          className={css({
            padding: '2',
            bg: 'white',
            borderRadius: 'sm',
            cursor: 'pointer',
          })}
          onClick={() => setOffset((prev) => prev + LIMIT)}
        >
          Load more
        </button>
      </div>
    </div>
  );
};

export default Liked;
