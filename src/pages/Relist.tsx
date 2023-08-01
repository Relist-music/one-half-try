import { Panel, PanelGroup } from 'react-resizable-panels';
import { Outlet } from 'react-router-dom';

import VerticalHandle from '@/components/Resize/VerticalHandle';
import Sidebar from '@/components/Sidebar/Sidebar';

import { onLayout } from '@/persistance/onLayout';
import { css } from '@/styled-system/css';
import { Container } from '@/styled-system/jsx';

export type RelistOutletContext = [
  hasScrolled: boolean,
  setHasScrolled: React.Dispatch<React.SetStateAction<boolean>>,
];

const Relist = () => {
  let storage;
  if (typeof localStorage !== 'undefined') {
    storage = localStorage;
  }

  return (
    <div
      className={css({
        padding: '2',
        bg: 'dark',
        height: '100vh',
      })}
    >
      <PanelGroup id="panel-group" onLayout={onLayout} direction="horizontal" storage={storage}>
        <Panel collapsedSize={6} collapsible={true} minSize={20} defaultSize={20} id="left-panel">
          <Sidebar />
        </Panel>
        <VerticalHandle />
        <Panel minSize={50} id="right-panel">
          <div
            className={css({
              p: '4',
              bg: 'primary',
              height: '100%',
              rounded: 'md',
              overflowY: 'scroll',
            })}
          >
            <Container>
              <Outlet />
            </Container>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Relist;
