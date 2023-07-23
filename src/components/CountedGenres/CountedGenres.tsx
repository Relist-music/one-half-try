import { useContext, useState } from 'react';

import { PlaylistContext } from '@/contexts/PlaylistContext';
import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const CountedGenres = ({ tracks }: { tracks: SpotifyApi.TrackObjectFull[] }) => {
  const [showAll, setShowAll] = useState(false);
  const { artists, setFilters } = useContext(PlaylistContext);

  console.log('tracks', tracks, artists);

  const countedGenres = tracks
    .reduce(
      (acc, track) => {
        const trackArtists = track.artists.map((artist) => artist.id);
        const artistData = artists.filter((artist) => trackArtists.includes(artist.id));
        artistData.forEach((artist) => {
          artist.genres.forEach((genre) => {
            const entry = acc.find((entry) => entry.name === genre);
            if (entry) {
              entry.count += 1;
            } else {
              acc.push({ name: genre, count: 1 });
            }
          });
        });
        console.log('acc', acc)
        return acc;
      },
      [] as { name: string; count: number }[],
    )
    .sort((a, b) => {
      return a.count < b.count ? 1 : -1;
    });

  const hasLotOfGenres = countedGenres.length > 5;
  const limit = 5;

  console.log('countedGenres', countedGenres)

  const addToFilters = (genre: string) => {
    setFilters((prev) => [...prev, genre]);
  };

  return (
    <div
      className={css({
        display: 'flex',
        gap: '2',
        flexWrap: 'wrap',
        marginBlockEnd: '1',
      })}
    >
      {countedGenres.slice(0, showAll ? countedGenres.length : limit).map((genre) => (
        <div
          key={genre.name}
          onClick={() => {
            console.log('clicked');
            addToFilters(genre.name);
          }}
        >
          <Tag label={`${genre.name} (${genre.count})`} />
        </div>
      ))}
      {hasLotOfGenres && (
        <div onClick={() => setShowAll((prev) => !prev)}>{!showAll ? '▶️' : '🔽'}</div>
      )}
    </div>
  );
};

export default CountedGenres;
