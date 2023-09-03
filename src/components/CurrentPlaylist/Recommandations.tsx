import { useCallback, useEffect, useMemo, useState } from 'react';

import { Checkbox } from 'antd';
import prettyMilliseconds from 'pretty-ms';

import fetchRecommandations from '@/services/fetchRecommandations';
import { fetchSpotifyWithRetry } from '@/services/fetchSpotify';
import { playOrResumeTrack } from '@/services/PlayResumePlayback';

import { RelistTrack } from '@/routes/relist/Liked';
import { css } from '@/styled-system/css';
import { square } from '@/styled-system/patterns';

import TrackGenresCell from '../Cells/TrackGenresCell';

const pickRecommandations = ({
  tracks,
  countedGenres,
}: {
  tracks: RelistTrack[];
  countedGenres: any;
}) => {
  if (tracks.length === 0) {
    return [];
  } else if (tracks.length < 5) {
    return pickRandomEntries(tracks, tracks.length);
  } else {
    return pickRandomEntries(tracks, 5);
  }
};

export function pickRandomEntries<T>(array: T[], numEntries: number): T[] {
  if (numEntries >= array.length) {
    return array; // Return the entire array if the number of entries requested is greater than or equal to the array length
  }

  const result: T[] = [];
  const indices = new Set<number>();

  while (indices.size < numEntries) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!indices.has(randomIndex)) {
      indices.add(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result;
}

interface RelistRecoomandationTrack extends SpotifyApi.RecommendationTrackObject {
  detailArtists?: SpotifyApi.ArtistObjectFull[];
  genres?: string[];
}

const Recommandations = ({
  tracks,
  countedGenres,
  ActiveFiltes,
  hasFetchDetails,
  toggleRecommandations,
  showRecommandations,
}: {
  tracks: RelistTrack[];
  countedGenres: any;
  ActiveFiltes: string[];
  hasFetchDetails: boolean;
  toggleRecommandations: () => void;
  showRecommandations: boolean;
}) => {
  const [recommandedTracks, setRecommandedTracks] = useState<RelistRecoomandationTrack[]>([]);
  const picked = useMemo(
    () =>
      hasFetchDetails && tracks.length ? pickRecommandations({ tracks, countedGenres }) : [],
    [hasFetchDetails, tracks.length],
  );

  const selectedSeeds = {
    seed_genres: '',
    seed_tracks: picked.map((track) => track.track.id).join(','),
    seed_artists: '',
  };

  const veouotreohoubr = useCallback(async () => {
    if (hasFetchDetails && tracks.length) {
      const { seeds, tracks } = await fetchRecommandations(selectedSeeds);
      console.log('reco called');
      setRecommandedTracks(tracks ?? []);

      tracks.map(async (track) => {
        const artistsIds = track.artists.map((artist) => artist.id);
        const { artists = [] } = await fetchSpotifyWithRetry<SpotifyApi.MultipleArtistsResponse>({
          url: `https://api.spotify.com/v1/artists?ids=${artistsIds.join(',')}`,
        });

        setRecommandedTracks((recommandedTracks) =>
          recommandedTracks.map((recoTrack) =>
            recoTrack.id === track.id
              ? {
                  ...recoTrack,
                  detailArtists: artists,
                genres: Array.from(new Set(artists.map((artist) => artist.genres).flat())),
                }
              : recoTrack,
          ),
        );
      });
    }
  }, [selectedSeeds]);

  useEffect(() => {
    veouotreohoubr();
  }, [hasFetchDetails, ActiveFiltes.length]);

  useEffect(() => {
    if (hasFetchDetails && tracks.length) {
      console.log('hjvehiuhveiurhue', recommandedTracks);
    }
  });

  const playRecommandationsList = async (track: RelistRecoomandationTrack) => {
    const indexOfSelectedTrack = recommandedTracks.findIndex(
      (recommandedTrack) => recommandedTrack.id === track.id,
    );
    const uris = recommandedTracks
      .slice(indexOfSelectedTrack)
      .map((filteredTrack) => filteredTrack.uri);
    await playOrResumeTrack({
      uris,
    });
  };

  return (
    <>
      <div
        className={css({
          display: 'flex',
          gap: 2,
          width: '100%',
        })}
        onClick={toggleRecommandations}
      >
        <h2>Recommandations</h2>
        <span>{showRecommandations} ? 🔼 : 🔽 </span>
        {picked.map(({ track }) => (
          <div
            key={`thumbnail-${track.id}`}
            title={`${track.name}\n by ${track.artists.map((artist) => artist.name).join(', ')}`}
            className={
              (square({ size: '2' }),
              css({
                width: '2.5rem',
                height: '2.5rem',
                rounded: 'xs',
                overflow: 'hidden',
              }))
            }
          >
            <img src={track.album.images.at(0)?.url} alt="" />
          </div>
        ))}
      </div>
      <hr />
      {!!recommandedTracks.length &&
        recommandedTracks.map((recoTrack) => {
          return (
            <div
              key={`relist-track-${recoTrack.id}`}
              className={css({
                display: 'grid',
                gridTemplateColumns:
                  'min-content minmax(80px,120px) 1fr 1fr max-content min-content',
                gap: '2',
              })}
              onClick={() => {
                console.log('play', recoTrack);
                playRecommandationsList(recoTrack);
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
                <img
                  src={recoTrack.album.images.at(0)?.url}
                  alt={`image of ${recoTrack.album.name}`}
                />
              </div>

              <div>
                <h2>{recoTrack.name}</h2>
                <p>{recoTrack.artists.map((artist) => artist.name).join(', ')}</p>
                <span>{recoTrack.album.name}</span>
              </div>

              <div>
                <TrackGenresCell
                  genres={recoTrack.genres}
                  track={{
                    id: recoTrack.id,
                    added_at: new Date().toISOString(),
                  }}
                />
              </div>

              <div>
                <h2>
                  {prettyMilliseconds(recoTrack.duration_ms, {
                    keepDecimalsOnWholeSeconds: true,
                    secondsDecimalDigits: 0,
                  }).replace(/ /, '')}
                </h2>
              </div>

              <div>❤️</div>
            </div>
          );
        })}
    </>
  );
};

export default Recommandations;
