import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const TrackGenresCell = ({
  genres = [],
  track,
}: {
  genres: string[] | undefined;
  track: {
    id: string;
    added_at: string;
  };
}) => {
  if (typeof genres === 'undefined') {
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
      {genres.map((genre) => (
        <Tag key={`${track.id}-added-${track.added_at}-${genre}`} label={genre} />
      ))}
    </div>
  );
};

export default TrackGenresCell;
