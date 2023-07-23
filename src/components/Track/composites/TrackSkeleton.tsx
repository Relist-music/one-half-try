import Skeleton from '@mui/material/Skeleton';
import { Skeleton as AntdSkeleton, Checkbox } from 'antd';

import { css } from '@/styled-system/css';

const TrackSkeleton = () => (
  <div
    className={css({
      display: 'flex',
      gap: '2',
      alignItems: 'center',
    })}
  >
    <div
      className={css({
        paddingInline: '2',
        display: 'flex',
        alignItems: 'center',
        _hover: {
          bg: '#28333799',
        },
      })}
    >
      <Checkbox />
    </div>
    <AntdSkeleton.Image
      active={true}
      className={css({
        bg: 'rgba(0, 0, 0, 0.158)',
        rounded: 'md',
      })}
    />
    <div
      className={css({
        width: '40%',
      })}
    >
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '100%',
        })}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '80%',
        })}
      ></Skeleton>
    </div>
    <div
      className={css({
        width: '40%',
      })}
    >
      {' '}
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '100%',
        })}
      ></Skeleton>
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '80%',
        })}
      ></Skeleton>
    </div>
    <div
      className={css({
        width: '10%',
      })}
    >
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '80%',
        })}
      ></Skeleton>
    </div>
    <div
      className={css({
        width: '10%',
      })}
    >
      <Skeleton
        variant="text"
        sx={{ fontSize: '1rem', bgcolor: 'grey.300' }}
        className={css({
          width: '80%',
        })}
      ></Skeleton>
    </div>
  </div>
);

export default TrackSkeleton;
