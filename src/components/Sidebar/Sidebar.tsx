import { Panel, PanelGroup } from 'react-resizable-panels';

import { css } from '@/styled-system/css';
import { VStack } from '@/styled-system/jsx';

import Player from '../Player/Player';

const Sidebar = () => {
  return (
    <VStack
      gap={1}
      className={css({
        height: '100%',
      })}
    >
      <PanelGroup id="sidebar-panel-group" direction="vertical">
        <Panel minSize={30} id="player">
          <Player />
        </Panel>
        <Panel minSize={30} id="link">
          <div>
            <h6>Search</h6>
            <h6>Home</h6>
            <h6>Playing Queue</h6>
            <h6>Genres</h6>
            <h6>Playlists</h6>
          </div>
        </Panel>
      </PanelGroup>
    </VStack>
  );
};

export default Sidebar;
