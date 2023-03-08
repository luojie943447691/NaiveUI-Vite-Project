import { cB, c } from './utils/cssr'

const test = cB(
  'tabs',
  `
box-sizing: border-box;
width: 100%;
display: flex;
flex-direction: column;
transition:
  background-color .3s var(--n-bezier),
  border-color .3s var(--n-bezier);
`,
  [
    cB(
      'tab-pane',
      `
  color: var(--n-pane-text-color);
  width: 100%;
  padding: var(--n-pane-padding);
  transition:
    color .3s var(--n-bezier),
    background-color .3s var(--n-bezier),
    opacity .2s var(--n-bezier);
  left: 0;
  right: 0;
  top: 0;
  `,
      [
        c(
          '&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active',
          `
    transition:
    color .3s var(--n-bezier),
    background-color .3s var(--n-bezier),
    transform .2s var(--n-bezier),
    opacity .2s var(--n-bezier);
  `
        ),
        c(
          '&.next-transition-leave-active, &.prev-transition-leave-active',
          `
    position: absolute;
  `
        ),
        c(
          '&.next-transition-enter-from, &.prev-transition-leave-to',
          `
    transform: translateX(32px);
    opacity: 0;
  `
        ),
        c(
          '&.next-transition-leave-to, &.prev-transition-enter-from',
          `
    transform: translateX(-32px);
    opacity: 0;
  `
        ),
        c(
          '&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to',
          `
    transform: translateX(0);
    opacity: 1;
  `
        ),
      ]
    ),
  ]
)

export default test
