import { Options, defineConfig } from 'tsup';
import { electronPreloadPlugin } from './plugins/electronPreloadPlugin';
import { env } from './env';

const isProduction = process.env.NODE_ENV === 'production';

const options: Options = {
  splitting: false,
  clean: isProduction,
  sourcemap: isProduction,
  minify: isProduction,
  keepNames: true,
  format: ['cjs'],
  external: [/electron/],
  define: {
    ...Object.entries(env).reduce(
      (e, [k, v]) => ({ ...e, [`process.env.${k}`]: JSON.stringify(v) }),
      {} as Record<string, string>
    )
  }
};

export default defineConfig([
  { ...options, entry: ['src/**/*.ts', '!src/preload/**'], outDir: 'dist', bundle: false },
  { ...options, entry: ['src/preload/index.ts'], outDir: 'dist/preload', esbuildPlugins: [electronPreloadPlugin] }
]);
