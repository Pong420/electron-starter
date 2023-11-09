## Renderer to Main

`electron/src/ipc/system.ts`

```ts
export const systemR2MIpc = createR2MIpc({
  async readFile(_event, pathname: string) {
   return fs.readFile(pathname, 'utf-8')
  }
}
```

`electron/src/ipc/index.ts`

```ts
import { systemR2MIpc } from './system';

export const r2mIpc = {
  ...systemR2MIpc
};
```

`renderer/xxx.ts`

```ts
adapter.readFile('/path/to/hello.txt');
```

## Main to renderer

```ts
export const systemM2RIpc = createM2RIpc({
  async log: {} as { message: string, type: string }
}
```

`electron/src/ipc/index.ts`

```ts
import { systemM2RIpc } from './system';

export const m2rIpc = {
  ...systemM2RIpc
};
```

`renderer/xxx.ts`

```ts
const unsubscribe = adapter.onLog(({ message, type }) => {
  console[type](message);
});

//
unsubscribe();
```

## Main to renderer and wait for a response

`electron/src/ipc/git.ts`

```ts
export const { senders: gitM2R, definition: gitM2RDefinition } = createM2RWithReplyIpc({
  gitCredentials: [] as unknown as [void, { username: string; password: string }]
});

const { username, password } = await gitM2R.gitCredentials(event);
console.log(username, password);
```

`electron/src/ipc/index.ts`

```ts
import { gitM2RDefinition } from './git';

export const m2rWithReplyDefinition = {
  ...gitM2RDefinition
};
```

`renderer/xxx.ts`

```ts
const unsubscribe = adapter.onGitCredentials(() => {
  // open a modal let user input username and password
  openModal();
});

//
unsubscribe();

// reply the git creditential anywhere
adapter.replyGitCredentials({ username: '...', password: '...' });
```

## Renderer to other Renderers

`electron/src/ipc/template.ts`

```ts
export const templateR2RIpc = createR2RIpc({
  contentUpdate(_event, content: string) {
    return content;
  }
});
```

`electron/src/ipc/index.ts`

```ts
import { templateR2RIpc } from './template';

export const r2rIpc = {
  ...templateR2RIpc
};
```

`renderer/xxx.ts`

```ts
adapter.emitContentUpdate('Hello World');

const unsubscribe = adapter.onContentUpdate(content => {
  // do something
});

//
unsubscribe();
```
