import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { getExportsStatic } from "pkg-exports";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default async () => {
  const exports = (
    await Promise.allSettled([getExportsStatic("naive-ui")])
  ).map((res) => (res.status === "fulfilled" ? res.value : []));

  return defineConfig({
    plugins: [
      vue(),
      Pages({
        extensions: ["tsx", "jsx", "ts", "js", "vue"],
        exclude: ["**/components/*.*"],
      }),
      vueJsx({
        include: [/.[jt]sx$/, /.vue$/],
      }),
      UnoCss({
        preprocess(matcher) {
          return matcher.startsWith("un-") ? matcher.slice(3) : undefined;
        },
      }),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": exports[0].filter(
              (m) => m.startsWith("N") || m.startsWith("use")
            ),
          },
        ],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
      }),
    ],
  });
};
