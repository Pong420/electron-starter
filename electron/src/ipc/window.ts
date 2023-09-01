import { screen, BrowserWindow } from 'electron';
import { createIpcHandlers } from './ipcCreator';

export const windowHandlers = createIpcHandlers({
  // https://gist.github.com/louisameline/1213bb112c6cb12a98b2ab525dfb8b07
  isMouseOutsideOfWindow: (event, [w, h]: [number, number]) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const { x, y } = screen.getCursorScreenPoint();
    const [cx, cy] = window?.getPosition() ?? [0, 0];
    return x < cx || x > cx + w || y < cy || y > cy + h;
  }
});
