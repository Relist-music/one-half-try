import { Panel, PanelGroup } from 'react-resizable-panels';

import VerticalHandle from '@/components/Resize/VerticalHandle';
import Sidebar from '@/components/Sidebar/Sidebar';

import { onLayout } from '@/persistance/onLayout';
import { css } from '@/styled-system/css';

const Temp = () => {
  let storage;
  if (typeof localStorage !== 'undefined') {
    storage = localStorage;
  }
  return (
    <div
      className={css({
        padding: '2',
        bg: 'dark',
        minHeight: 'min-content',
      })}
    >
      <PanelGroup
        id="panel-group"
        onLayout={onLayout}
        direction="horizontal"
        storage={storage}
      >
        <Panel minSize={10} defaultSize={10} id="left-panel">
          <Sidebar />
        </Panel>
        <VerticalHandle />
        <Panel minSize={50} id="right-panel">
          <div>hello</div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Temp;
