import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Pages from "vite-plugin-pages";
import svgLoader from "vite-svg-loader";
import UnoCSS from 'unocss/vite'
const __filenameNew = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenameNew);
const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
    Pages({
      dirs: "src/pages",
      exclude: ["**/components/**/*.vue", "**/components/**/*.ts"],
    }),
    //按需导入需要配置这个才能使Elmessage的样式生效 ，否则Elmessage显示不出来
    ElementPlus({
      useSource: true,
    }),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: "sass",
        }),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts"),
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: "sass",
        }),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),

    Icons({
      autoInstall: true,
    }),
    svgLoader(),
  ],
  server: {
    host: "localhost",
    open: true,
    proxy: {
      // "/api": {
      //   target: "http://test-api-global-payment-employee.shebao.net",
      //   changeOrigin: true,
      // },
    },
  },
});
