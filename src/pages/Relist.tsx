import { Panel, PanelGroup } from 'react-resizable-panels';

import MainContent from '@/components/MainContent/MainContent';
import VerticalHandle from '@/components/Resize/VerticalHandle';
import Sidebar from '@/components/Sidebar/Sidebar';

import { onLayout } from '@/persistance/onLayout';
import { css } from '@/styled-system/css';

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
      <PanelGroup
        id="panel-group"
        onLayout={onLayout}
        direction="horizontal"
        storage={storage}
      >
        <Panel minSize={20} defaultSize={20} id="left-panel">
          <Sidebar />
        </Panel>
        <VerticalHandle />
        <Panel minSize={50} id="right-panel">
          <MainContent />
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Relist;
