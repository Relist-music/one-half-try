import { css } from '@/styled-system/css';

const ConnectButton = ({
  label,
  bgColor,
  onClick,
  disabled,
}: {
  label: string;
  bgColor: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={css({
        bg: {
          base: bgColor,
          _disabled: 'gray',
        },
        px: 4,
        py: 2,
        borderRadius: 'full',
        _hover: {
          base: {
            cursor: 'pointer',
          },
          _disabled: {
            cursor: 'not-allowed',
          },
        },
      })}
    >
      {label}
    </button>
  );
};

export default ConnectButton;
