import { css } from '@/styled-system/css';

const ActiveFilters = ({
  filters,
  removeFilter,
}: {
  filters: string[];
  removeFilter: (genre: string) => void;
}) => {
  return (
    <div>
      <span
        className={css({
          fontSize: 'xl',
        })}
      >
        Active filters
      </span>
      {filters.map((filter) => (
        <div
          key={`active-filers--${filter}`}
          className={css({
            display: 'flex',
            gap: '0.5',
            borderRadius: 'xl',
            padding: '1',
            border: '1px solid white',
            width: 'min-content',
            fontSize: 'sm',
          })}
          onClick={() => removeFilter(filter)}
        >
          <span
            className={css({
              width: 'max-content',
            })}
          >
            {filter}
          </span>
          <div
            className={css({
              cursor: 'pointer',
            })}
          >
            ❌
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
