import useArtists from '@/hooks/useArtists';

import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const TrackGenresCell = ({ artistIds = [] }: { artistIds: string[] }) => {
  const { data, isLoading } = useArtists({ artistIds });

  if (!data) {
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
      {data.artists.map((artist) => {
        return artist.genres.map((genre) => <Tag key={`${artist.id}${genre}`} label={genre} />);
      })}
    </div>
  );
};

export default TrackGenresCell;
