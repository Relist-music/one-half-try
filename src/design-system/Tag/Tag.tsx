import { cva } from '@/styled-system/css';

const tagStyles = cva({
  base: {
    fontFamily: 'tag',
    fontWeight: 'medium',
    lineHeight: 'none',
    bg: 'yellow',
  },
  variants: {
    size: {
      sm: {
        padding: '0.13rem 0.5rem 0.1875rem 0.5rem',
      },
    },
    rounded: {
      sm: {
        rounded: 'sm',
      },
    },
  },
  defaultVariants: {
    rounded: 'sm',
  },
});

export const Tag = ({
  label,
  background,
  color,
}: {
  label: string;
  background?: string;
  color?: string;
}) => {
  return (
    <button
      className={tagStyles({ size: 'sm' })}
      style={{ backgroundColor: background, color }}
    >
      {label}
    </button>
  );
};

export default Tag;
