import { useEffect, useState } from 'react';

import Tag from '@/design-system/Tag/Tag';
import { css } from '@/styled-system/css';

const CountedGenres = ({
  countedGenresObject,
  addToFilters,
}: {
  countedGenresObject: Record<string, number>;
  addToFilters: (genre: string) => void;
}) => {
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setShowAll(false);
  }, []);

  const countedGenres = Object.entries(countedGenresObject)
    .map(([k, v]) => ({ name: k, count: v }))
    .sort((a, b) => {
      return a.count < b.count ? 1 : -1;
    });

  const hasLotOfGenres = countedGenres.length > 5;
  const limit = 5;

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
        <div key={`${genre.name}-${genre.count}`} onClick={() => addToFilters(genre.name)}>
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
