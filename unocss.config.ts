import { defineConfig } from 'unocss'

export default defineConfig({
  include: [/.tsx$/],
  preprocess(matcher) {
    return matcher.startsWith('un-') ? matcher.slice(3) : undefined
  },
})
