// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite@4.2.1_sass@1.60.0/node_modules/vite/dist/node/index.js";
import { splitVendorChunkPlugin } from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite@4.2.1_sass@1.60.0/node_modules/vite/dist/node/index.js";
import react from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/@vitejs+plugin-react@3.1.0_vite@4.2.1/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteTsconfigPaths from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-tsconfig-paths@4.0.7_typescript@5.0.3_vite@4.2.1/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgrPlugin from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-plugin-svgr@2.4.0_rollup@2.79.1_vite@4.2.1/node_modules/vite-plugin-svgr/dist/index.mjs";
import EnvironmentPlugin from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-plugin-environment@1.1.3_vite@4.2.1/node_modules/vite-plugin-environment/dist/index.js";
import { chunkSplitPlugin } from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-plugin-chunk-split@0.4.7_vite@4.2.1/node_modules/vite-plugin-chunk-split/dist/index.js";
import viteCompression from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.2.1/node_modules/vite-plugin-compression/dist/index.mjs";
import { VitePWA } from "file:///D:/development/Nodejs/OpenSource/cleany/578-minimal/node_modules/.pnpm/vite-plugin-pwa@0.14.7_vite@4.2.1_workbox-build@6.5.4_workbox-window@6.5.4/node_modules/vite-plugin-pwa/dist/index.mjs";
import { resolve } from "path";

// public/manifest.json
var manifest_default = {
  short_name: "ReactPlay",
  name: "ReactPlay",
  icons: [
    {
      src: "favicon.ico",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/x-icon"
    },
    {
      src: "logo192x192.png",
      type: "image/png",
      sizes: "192x192"
    },
    {
      src: "logo512x512.png",
      type: "image/png",
      sizes: "512x512"
    },
    {
      src: "maskable_icon.png",
      sizes: "64x64 32x32 24x24 16x16 512x512 192x192",
      type: "image/png",
      purpose: "maskable"
    }
  ],
  start_url: ".",
  display: "standalone",
  theme_color: "#000000",
  background_color: "#ffffff"
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\development\\Nodejs\\OpenSource\\cleany\\578-minimal";
var vite_config_default = defineConfig(({ command, mode }) => {
  const localEnv = loadEnv(mode, process.cwd(), "");
  const { DEV_PORT = 3e3 } = localEnv;
  const isDevelopment = mode === "development";
  const htmlPlugin = () => {
    return {
      name: "html-transform",
      transformIndexHtml(html) {
        return html.replace(/%(.*?)%/g, function(match, p1) {
          return localEnv[p1];
        });
      }
    };
  };
  return {
    plugins: [
      viteCompression(),
      htmlPlugin(),
      EnvironmentPlugin("all", { prefix: "REACT_APP_" }),
      react(),
      viteTsconfigPaths(),
      svgrPlugin(),
      splitVendorChunkPlugin(),
      chunkSplitPlugin({
        strategy: "default"
      }),
      VitePWA({
        manifest: manifest_default,
        includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
        // switch to "true" to enable sw on development
        devOptions: {
          enabled: false
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"]
        }
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        common: resolve(__vite_injected_original_dirname, "src", "common"),
        ErrorBoundary: resolve(__vite_injected_original_dirname, "src", "ErrorBoundary"),
        images: resolve(__vite_injected_original_dirname, "src", "images"),
        meta: resolve(__vite_injected_original_dirname, "src", "meta"),
        plays: resolve(__vite_injected_original_dirname, "src", "plays")
      }
    },
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    envPrefix: "REACT_APP_",
    define: {
      "process.env": localEnv
      //      "process.env.NODE_ENV": `"${mode}"`
    },
    server: {
      port: DEV_PORT
    },
    //  envPrefix: 'VITE_',
    build: {
      chunkSizeWarningLimit: 1600,
      minify: "terser",
      target: "esnext",
      terserOptions: {
        output: {
          comments: false
          // This will remove all comments from the output files
        }
      }
    },
    css: {
      modules: {
        generateScopedName: isDevelopment ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicHVibGljL21hbmlmZXN0Lmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXZlbG9wbWVudFxcXFxOb2RlanNcXFxcT3BlblNvdXJjZVxcXFxjbGVhbnlcXFxcNTc4LW1pbmltYWxcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGRldmVsb3BtZW50XFxcXE5vZGVqc1xcXFxPcGVuU291cmNlXFxcXGNsZWFueVxcXFw1NzgtbWluaW1hbFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZGV2ZWxvcG1lbnQvTm9kZWpzL09wZW5Tb3VyY2UvY2xlYW55LzU3OC1taW5pbWFsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgdml0ZVRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XHJcbmltcG9ydCBzdmdyUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5pbXBvcnQgRW52aXJvbm1lbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZW52aXJvbm1lbnQnXHJcbmltcG9ydCB7IGNodW5rU3BsaXRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1jaHVuay1zcGxpdCc7XHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vcHVibGljL21hbmlmZXN0Lmpzb24nO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KSA9PiB7XHJcbiAgIC8vIExvYWQgYXBwLWxldmVsIGVudiB2YXJzIHRvIG5vZGUtbGV2ZWwgZW52IHZhcnMuXHJcbiAgIGNvbnN0IGxvY2FsRW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcclxuXHRjb25zdCB7IERFVl9QT1JUID0gMzAwMCB9ID0gbG9jYWxFbnY7XHJcbiAgXHRjb25zdCBpc0RldmVsb3BtZW50ID0gbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiO1xyXG5cclxuXHRjb25zdCBodG1sUGx1Z2luID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiaHRtbC10cmFuc2Zvcm1cIixcclxuICAgICAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWw6IHN0cmluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvJSguKj8pJS9nLCBmdW5jdGlvbiAobWF0Y2gsIHAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsRW52W3AxXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgcmV0dXJuIHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHR2aXRlQ29tcHJlc3Npb24oKSxcclxuXHRcdGh0bWxQbHVnaW4oKSxcclxuXHRcdEVudmlyb25tZW50UGx1Z2luKCdhbGwnLCB7IHByZWZpeDogJ1JFQUNUX0FQUF8nIH0pLFxyXG5cdFx0cmVhY3QoKSxcclxuXHRcdHZpdGVUc2NvbmZpZ1BhdGhzKCksXHJcblx0XHRzdmdyUGx1Z2luKCksXHJcblx0XHRzcGxpdFZlbmRvckNodW5rUGx1Z2luKCksXHJcblx0XHRjaHVua1NwbGl0UGx1Z2luKHtcclxuICAgICAgXHRcdHN0cmF0ZWd5OiAnZGVmYXVsdCcsXHJcbiAgICBcdH0pLFxyXG4gXHRWaXRlUFdBKHtcclxuICAgICAgbWFuaWZlc3QsXHJcbiAgICAgIGluY2x1ZGVBc3NldHM6IFsnZmF2aWNvbi5zdmcnLCAnZmF2aWNvbi5pY28nLCAncm9ib3RzLnR4dCcsICdhcHBsZS10b3VjaC1pY29uLnBuZyddLFxyXG4gICAgICAvLyBzd2l0Y2ggdG8gXCJ0cnVlXCIgdG8gZW5hYmxlIHN3IG9uIGRldmVsb3BtZW50XHJcbiAgICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgfSxcclxuICAgICAgd29ya2JveDoge1xyXG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbH0nLCAnKiovKi57c3ZnLHBuZyxqcGcsZ2lmfSddLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICAgIFx0YWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxyXG5cdFx0Y29tbW9uOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiwgXCJjb21tb25cIiksXHJcblx0XHRFcnJvckJvdW5kYXJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiwgXCJFcnJvckJvdW5kYXJ5XCIpLFxyXG5cdFx0aW1hZ2VzOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiwgXCJpbWFnZXNcIiksXHJcblx0XHRtZXRhOiByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIiwgXCJtZXRhXCIpLFxyXG5cdFx0cGxheXM6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiLCBcInBsYXlzXCIpLFxyXG5cclxuICAgICAgXHR9LFxyXG4gICAgfSxcclxuXHQvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzE5NzMjaXNzdWVjb21tZW50LTc4NzU3MTQ5OVxyXG5cdGVudlByZWZpeDogJ1JFQUNUX0FQUF8nLFxyXG4gICAgZGVmaW5lOiB7XHJcblx0XHQncHJvY2Vzcy5lbnYnOiBsb2NhbEVudlxyXG4vLyAgICAgIFwicHJvY2Vzcy5lbnYuTk9ERV9FTlZcIjogYFwiJHttb2RlfVwiYFxyXG4gICAgfSxcclxuXHRzZXJ2ZXI6IHtcclxuICAgIHBvcnQ6IERFVl9QT1JULFxyXG4gIH0sXHJcbi8vICBlbnZQcmVmaXg6ICdWSVRFXycsXHJcblx0YnVpbGQ6IHtcclxuXHRcdGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTYwMCxcclxuXHRcdG1pbmlmeTondGVyc2VyJyxcclxuXHRcdHRhcmdldDogJ2VzbmV4dCcsXHJcblx0XHR0ZXJzZXJPcHRpb25zOiB7XHJcblx0XHRcdG91dHB1dDoge1xyXG5cdFx0XHRjb21tZW50czogZmFsc2UsIC8vIFRoaXMgd2lsbCByZW1vdmUgYWxsIGNvbW1lbnRzIGZyb20gdGhlIG91dHB1dCBmaWxlc1xyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdCBjc3M6IHtcclxuICAgICAgbW9kdWxlczoge1xyXG4gICAgICAgIGdlbmVyYXRlU2NvcGVkTmFtZTogaXNEZXZlbG9wbWVudFxyXG4gICAgICAgICAgPyBcIltuYW1lXV9fW2xvY2FsXV9fW2hhc2g6YmFzZTY0OjVdXCJcclxuICAgICAgICAgIDogXCJbaGFzaDpiYXNlNjQ6NV1cIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcblx0fVxyXG5cclxufSlcclxuIiwgIntcclxuICBcInNob3J0X25hbWVcIjogXCJSZWFjdFBsYXlcIixcclxuICBcIm5hbWVcIjogXCJSZWFjdFBsYXlcIixcclxuICBcImljb25zXCI6IFtcclxuICAgIHtcclxuICAgICAgXCJzcmNcIjogXCJmYXZpY29uLmljb1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiNjR4NjQgMzJ4MzIgMjR4MjQgMTZ4MTZcIixcclxuICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UveC1pY29uXCJcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIFwic3JjXCI6IFwibG9nbzE5MngxOTIucG5nXCIsXHJcbiAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBcInNyY1wiOiBcImxvZ281MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgXCJzcmNcIjogXCJtYXNrYWJsZV9pY29uLnBuZ1wiLFxyXG4gICAgICBcInNpemVzXCI6IFwiNjR4NjQgMzJ4MzIgMjR4MjQgMTZ4MTYgNTEyeDUxMiAxOTJ4MTkyXCIsXHJcbiAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXHJcbiAgICB9XHJcbiAgXSxcclxuICBcInN0YXJ0X3VybFwiOiBcIi5cIixcclxuICBcImRpc3BsYXlcIjogXCJzdGFuZGFsb25lXCIsXHJcbiAgXCJ0aGVtZV9jb2xvclwiOiBcIiMwMDAwMDBcIixcclxuICBcImJhY2tncm91bmRfY29sb3JcIjogXCIjZmZmZmZmXCJcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVWLFNBQVMsY0FBYyxlQUFlO0FBQzdYLFNBQVMsOEJBQThCO0FBQ3ZDLE9BQU8sV0FBVztBQUNsQixPQUFPLHVCQUF1QjtBQUM5QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLHVCQUF1QjtBQUM5QixTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLHFCQUFxQjtBQUM1QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxlQUFlOzs7QUNUeEI7QUFBQSxF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
