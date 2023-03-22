interface PageButtonIcon {
  name: string
  size: number
  style: any
}
interface PageButton {
  class: string
  color: string
  colorHover: string
  icon: PageButtonIcon
  href: string
  target: string
}

interface Page {
  title: string
  description: string
  links: PageButton[]
  about: {
    description: string
    buttons: PageButton[]
  }
  back: {
    text: string
  }
  footer: {
    buttons: PageButton[]
    action: {
      text: string
      href: string
      target: string
    }
  }
}