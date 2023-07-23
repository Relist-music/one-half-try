import { useContext, useEffect } from 'react';

import useArtists from '@/hooks/useArtists';

import { PlaylistContext } from '@/contexts/PlaylistContext';
import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const TrackGenresCell = ({ artistIds = [] }: { artistIds: string[] }) => {
  const { setArtists } = useContext(PlaylistContext);
  const { data: { artists = [] } = {}, isLoading } = useArtists({ artistIds });

  useEffect(() => {
    setArtists((prev) => [...prev, ...artists]);
  }, [artists]);

  if (!artists) {
    return <h2>there was an error,please refresh</h2>;
  }
  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div
      className={css({
        display: 'flex',
        gap: '1',
        flexWrap: 'wrap',
      })}
    >
      {artists.map((artist) => {
        return artist.genres.map((genre) => <Tag key={`${artist.id}${genre}`} label={genre} />);
      })}
    </div>
  );
};

export default TrackGenresCell;
