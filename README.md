# Electron Starter

Electron starter template that supports different frontend SPA template

1. Make sure [pnpm](https://pnpm.io/) cli installed
2. Copy your frontend starter template to the `renderer` directory
3. Install dependencies and make sure `dev` & `build` scripts exist in `renderer/package.json``
4. If the output directory of the frontend template is not `build`. Replace `build` in root `/package.json` and `electron/constants.ts`
5. Change the localhost port number in `electron/src/main/window.ts` if needed
6. Make sure `renderer/tsconfig.json` contains the below configuration

   ```json
   {
     "include": ["../electron/src/preload/adapter.ts", "../electron/electron-env.d.ts"]
   }
   ```

7. To use ipc, please refer to `electron/ipc/window.ts`. And use it as `adapter.isMouseOutsideOfWindow([window.innerWidth, window.innerHeight])`

## Development

```
pnpm install
npm run dev
```

## Build and Release

1. Upgrade the version number of all `package.json``
   ```sh
   # sh scripts/version.sh [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
   sh scripts/version.sh patch
   ```
2. Run the command below and check `/release`

   ```sh
   npm run package
   ```

   For other platforms, please check [electron-builder](https://www.electron.build/index.html) for more details
