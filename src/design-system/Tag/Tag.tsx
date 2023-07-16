import { cva } from '@/styled-system/css';

// const a = () => cva({

// })

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
        padding: '0.1rem 0.5rem 0.1875rem 0.5rem',
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
}: {
  label: string;
  background?: string;
}) => {
  return (
    <button
      className={tagStyles({ size: 'sm' })}
      style={{ backgroundColor: background }}
    >
      {label}
    </button>
  );
};

export default Tag;
