import { cva } from '@/styled-system/css';

const tagStyles = ({
  background = 'white',
  color = 'black',
}: {
  background?: string;
  color?: string;
}) =>
  cva({
    base: {
      fontFamily: 'tag',
      fontWeight: 'medium',
      lineHeight: 'none',
      background: background,
      color: color,
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
  return <button className={tagStyles({ background, color })({ size: 'sm' })}>{label}</button>;
};

export default Tag;
