import { defineConfig, loadEnv } from 'vite';
import { splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import EnvironmentPlugin from 'vite-plugin-environment'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import viteCompression from 'vite-plugin-compression';

import eslintPlugin from "@nabla/vite-plugin-eslint";
import { resolve } from "path";
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'
//import manifest from './manifest.json';


// const pwaOptions: Partial<VitePWAOptions> = {
  // mode: 'development',
  // base: '/',
  // includeAssets: ['favicon.svg'],
  // manifest: manifest,
  // devOptions: {
    // enabled: process.env.SW_DEV === 'true',
    // /* when using generateSW the PWA plugin will switch to classic */
    // type: 'module',
    // navigateFallback: 'index.html',
  // },
// }

// const replaceOptions = { __DATE__: new Date().toISOString() }
// const reload = true
// const selfDestroying = true

  // pwaOptions.srcDir = 'src'
  // pwaOptions.filename = 'service-worker.ts'
  // pwaOptions.strategies = 'injectManifest';
  // (pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest';
  // (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
  // pwaOptions.registerType = 'autoUpdate'

// if (reload) {
//  @ts-expect-error just ignore
  // replaceOptions.__RELOAD_SW__ = 'true'
// }

// if (selfDestroying)
  // pwaOptions.selfDestroying = selfDestroying



export default defineConfig(({ command, mode }) => {
   // Load app-level env vars to node-level env vars.
   const localEnv = loadEnv(mode, process.cwd(), '')
	const { DEV_PORT = 3000 } = localEnv;
  	const isDevelopment = mode === "development";

	const htmlPlugin = () => {
        return {
            name: "html-transform",
            transformIndexHtml(html: string) {
                return html.replace(/%(.*?)%/g, function (match, p1) {
                    return localEnv[p1];
                });
            },
        };
    };


  return {
	plugins: [
		viteCompression(),
		htmlPlugin(),
		EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
		react({
      		jsxRuntime: "classic"
    	}),
		viteTsconfigPaths(),
		svgrPlugin(),
		splitVendorChunkPlugin(),
		chunkSplitPlugin({
      		strategy: 'default',
    	}),
		VitePWA(manifestForPlugin),
		eslintPlugin({fix: true}),
  ],
  resolve: {
      	alias: {
        "@": resolve(__dirname, "src"),
		common: resolve(__dirname, "src/common"),
		ErrorBoundary: resolve(__dirname, "src", "ErrorBoundary"),
		images: resolve(__dirname, "src", "images"),
		meta: resolve(__dirname, "src", "meta"),
		plays: resolve(__dirname, "src", "plays"),

      	},
    },
	// https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
	envPrefix: 'REACT_APP_',
    define: {
		'process.env': localEnv
//      "process.env.NODE_ENV": `"${mode}"`
    },
	server: {
    port: DEV_PORT,
  },
//  envPrefix: 'VITE_',
	build: {
		chunkSizeWarningLimit: 1600,
		minify:'terser',
		target: 'esnext',
		terserOptions: {
			output: {
			comments: false, // This will remove all comments from the output files
			},
		},
	},
	 css: {
      modules: {
        generateScopedName: isDevelopment
          ? "[name]__[local]__[hash:base64:5]"
          : "[hash:base64:5]",
      },
    },
	}

})

const manifestForPlugin  = {
		srcDir: 'src',
		filename: 'service-worker.ts',
		strategies: "injectManifest",
//	register: "prompt",
		includeAssets: ["favicon.ico", "logo.png", "maskable_icon.png"],
		manifest: {
		name: "React Play",
		short_name: "React Play",
		description: "ReactPlay is an opensource platform that helps you learn ReactJS faster with hands-on practice model. It is a collection of projects that you can use to learn ReactJS.",
		icons: [
			{
			  "src": "favicon.ico",
			  "sizes": "64x64 32x32 24x24 16x16",
			  "type": "image/x-icon"
			},
			{
				src: "/logo192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			
			{
				src: "/logo152x152.png",
				sizes: "152x152",
				type: "image/png",
			},
		
        {
            "src": "/logo256x256.png",
            "sizes": "256x256",
            "type": "image/png"
        },
        {
            "src": "/logo384x384.png",
            "sizes": "384x384",
            "type": "image/png"
        },
        {
            "src": "/logo512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        },	
			{
				src: "/logo48x48.png",
				sizes: "48x48",
				type: "image/png",
			},
			{
				src: "/logo32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: "/logo24x24.png",
				sizes: "24x24",
				type: "image/png",
			},
			{
				src: "/logo16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
			  "src": "maskable_icon.png",
			  "sizes": "64x64 32x32 24x24 16x16 512x512 192x192",
			  "type": "image/png",
			  "purpose": "maskable"
			}
		],
		theme_color: "#000000",
		// background_color: "#e8ebf2",
		display: "standalone",
		base: "/",
		scope: "/",
		start_url: "/",
		orientation: "portrait",
		},
	// switch to "true" to enable sw on development
      devOptions: {
        enabled: true,
        type: 'module',
		navigateFallback: 'index.html',
      },
      // workbox: {
        // globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
		// runtimeCaching: [
          // {
            // urlPattern: ({ url }) => {
              // return url.pathname.startsWith("/api");
            // },
            // handler: "CacheFirst" as const,
            // options: {
              // cacheName: "api-cache",
              // cacheableResponse: {
                // statuses: [0, 200],
              // },
            // },
          // },
		  // {
        // urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        // handler: 'CacheFirst',
        // options: {
          // cacheName: 'google-fonts-cache',
          // expiration: {
            // maxEntries: 10,
            // maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          // },
          // cacheableResponse: {
            // statuses: [0, 200]
          // }
        // }
      // },
      // {
        // urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        // handler: 'CacheFirst',
        // options: {
          // cacheName: 'gstatic-fonts-cache',
          // expiration: {
            // maxEntries: 10,
            // maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          // },
          // cacheableResponse: {
            // statuses: [0, 200]
          // },
        // }
      // }
        // ],
      // },
}
