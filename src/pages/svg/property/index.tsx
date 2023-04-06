export default defineComponent({
  setup() {
    return () => (
      <div style='height:calc(100vh - var(--safe-area-inset-top))'>
        <svg width={300} height={300} viewBox='0 0 100 100'>
          <circle cx={100} cy={100} r={100} fill='#ff0000' />
        </svg>
      </div>
    )
  },
})
