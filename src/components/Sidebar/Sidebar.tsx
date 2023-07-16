import { Panel, PanelGroup } from 'react-resizable-panels';

import { css } from '@/styled-system/css';

import Player from '../Player/Player';
import HorizontalHandle from '../Resize/HorizontalHandle';

const Sidebar = () => {
  return (
    <div
      className={css({
        height: '100%',
      })}
    >
      <PanelGroup
        id="sidebar-panel-group"
        direction="vertical"
        className={css({
          height: '100%',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          })}
        >
          <Panel
            minSize={45}
            id="player"
            className={css({
              minHeight: '340px',
              height: 'min-content',
            })}
          >
            <Player />
          </Panel>
          <HorizontalHandle />
          <Panel
            minSize={30}
            id="link"
            className={css({
              minHeight: '200px',
            })}
          >
            <div
              className={css({
                bg: 'primary',
                p: '2',
                rounded: 'md',
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                height: '100%',
              })}
            >
              <h6>Search</h6>
              <h6>Home</h6>
              <h6>Playing Queue</h6>
              <h6>Genres</h6>
              <h6>Playlists</h6>
            </div>
          </Panel>
        </div>
      </PanelGroup>
    </div>
  );
};

export default Sidebar;
