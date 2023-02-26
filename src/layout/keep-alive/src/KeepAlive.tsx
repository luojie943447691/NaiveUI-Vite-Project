import { Component, DefineComponent, KeepAlive } from 'vue'

export const RKeepAlive = defineComponent({
  setup(props, { slots }) {
    const includeRef = ref<string[]>([])

    return () => {
      const include = includeRef.value

      const name = (slots.default?.()[0].type as unknown as DefineComponent)
        .name

      if (name && !include.includes(name)) includeRef.value.push(name)

      return (
        <KeepAlive include={include}>
          {{
            default: () => slots.default && slots.default(),
          }}
        </KeepAlive>
      )
    }
  },
})
