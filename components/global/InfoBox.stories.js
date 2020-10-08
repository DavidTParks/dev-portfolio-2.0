export default {
  title: 'Info Box'
}

export const Default = () => '<InfoBox />'
export const Warning = () => `<InfoBox :variant="'warning'" />`
export const Danger = () => `<InfoBox :variant="'danger'" />`
export const Help = () => `<InfoBox :variant="'help'" />`
export const CallToAction = () => `<InfoBox :variant="'callToAction'" />`