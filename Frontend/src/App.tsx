import * as React from "react";
import {
  DockviewApi,
  DockviewReact,
  DockviewReadyEvent,
  IDockviewPanelProps
} from "dockview";

import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';

import { Navbar } from "./components";
import { AssetBrowser, GameViewport } from "./components/Panels";
import { reportGameViewportBounds } from "./common/messaging/events";

import getWebviewApi, { hasWebviewApi } from "./common/webviewApi";

// Styles
import 'dockview/dist/styles/dockview.css';
import './App.scss';
import './themes/dockview.scss';

type ShowHeaderIconProps = {
  onClick: () => void,  
}

function ShowHeaderIcon(props: ShowHeaderIconProps) {
   return (
    <div className={"show-tab-header-icon"} onClick={props.onClick}></div>
   );
}

type DefaultProps = {
	title: string,
};

function DefaultPanel(props: IDockviewPanelProps<DefaultProps>) {
  const [isHeaderHidden, setIsHeaderHidden] = React.useState(props.api.group.header.hidden);

  const handleShowHeader = () => {
    props.api.group.header.hidden = false;
    props.api.group.locked = false;

    setIsHeaderHidden(false);
  };

  return (
    <div className={"default-dock-panel"}>
      {isHeaderHidden && <ShowHeaderIcon onClick={handleShowHeader}/>}
      <div style={{ padding: "20px", color: "white" }}>
        {props.params.title}
      </div>
    </div>
  );
}

const components = {
  default: DefaultPanel,
  gameViewport: GameViewport,
  assetBrowser: AssetBrowser,
};

export const App: React.FC = () => {
  const onReady = (event: DockviewReadyEvent) => {
    const directoryViewPanel = event.api.addPanel({
      id: "directory_view",
      title: "📂 Directory view",
      component: "default",
      params: {
        title: "Directory view panel"
      }
    });

    // panel.group.locked = true;
    // panel.group.header.hidden = true;

    const controlsPanel = event.api.addPanel({
      id: "controls_panel",
      component: "default",
      title: "Controls",
      params: {
        title: "Controls Panel"
      },
      position: {
        referencePanel: "directory_view",
        direction: "right"
      }
    });

    const contentPanel = event.api.addPanel({
      id: "content_panel",
      component: "default",
      title: "📑 Content",
      params: {
        title: "Directory content panel"
      },
      position: {
        referencePanel: "controls_panel",
        direction: "below"
      }
    });

    const previewPanel = event.api.addPanel({
      id: "preview_panel",
      component: "default",
      title: "🌆 Preview",
      params: {
        title: "Preview panel"
      },
      position: {
        referencePanel: "content_panel",
        direction: "within"
      }
    });

    const propertiesPanel = event.api.addPanel({
      id: "properties_panel",
      component: "default",
      title: "📝 Properties",
      params: {
        title: "Properties panel"
      },
      position: {
        referencePanel: "content_panel",
        direction: "below"
      }
    });

    // const gameViewport = event.api.addPanel({
    //   id: "game_viewport",
    //   component: "gameViewport",
    //   title: "Game Viewport",
    //   params: {
    //     title: "Game Viewport"
    //   },
    //   position: {
    //     referencePanel: "top_panel",
    //     direction: "below"
    //   }
    // });

    directoryViewPanel.group.locked = true;
    directoryViewPanel.group.header.hidden = true;

    propertiesPanel.group.locked = true;
    propertiesPanel.group.header.hidden = true;
    
    controlsPanel.group.locked = true;
    controlsPanel.group.header.hidden = true;

    contentPanel.api.setActive();
    
    const w = event.api.width;
    const h = event.api.height;
    
    controlsPanel.group.api.setConstraints({
      minimumHeight: 40,
    })
    controlsPanel.api.setSize({
      height: 60
    });
    
    directoryViewPanel.api.setSize({
      width: Math.max(200, w / 6)
    });

    propertiesPanel.api.setSize({
      height: Math.max(150, h / 4)
    });

    



    // rightPanel.api.setSize({
    //   width: Math.max(200, w / 6),
    // });

    // bottomPanel.api.setSize({
    //   height: h / 4
    // });

    // gameViewport.api.onDidDimensionsChange((e) => {
    //   const viewport = document.getElementById("GAME_VIEWPORT");
    //   if (!viewport) {
    //     console.log("Couldn't find viewport element");
    //     return;
    //   }

    //   reportGameViewportBounds(viewport, e.width, e.height);
    // });

  };

  const handleWindowControlEvent = (name: string) => {
    const webview = getWebviewApi();
    if (!webview) {
      return;
    }

    webview.postMessage({
      type: "event",
      name
    });
  };

  const handleMinimized = () => {
    handleWindowControlEvent("minimized");
  };

  const handleMaximized = () => {
    handleWindowControlEvent("maximized");
  };

  const handleClosed = () => {
    handleWindowControlEvent("closed");
  };

  return (
    <div id="AppContainer" data-is-in-engine={hasWebviewApi() ? "false" : "false"}>
      <Navbar onMinimize={handleMinimized} onMaximize={handleMaximized} onClose={handleClosed}/>
      <DockviewReact
        components={components}
        onReady={onReady}
        className="custom-dockview-theme"
      />
    </div>
  );
};

export default App;
