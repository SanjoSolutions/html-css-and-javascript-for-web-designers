import { createTemplate } from '../../helpers/createTemplate.js'

const template = createTemplate(`
  <template>
    <style>
      .color {
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 9px;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }
    </style>
    <div class="color"></div>
    <c-toast>Color copied</c-toast>
  </template>
`)

export class Color extends HTMLElement {
  static get observedAttributes() {
    return [
      'color'
    ]
  }

  constructor() {
    super()
    const templateContent = template.content
    this._shadowRoot = this.attachShadow({mode: 'closed'})
    this._shadowRoot.appendChild(templateContent.cloneNode(true))

    this.color = ''
    this.copyColor = this.copyColor.bind(this)
  }

  connectedCallback() {
    const color = this._shadowRoot.querySelector('.color')
    color.addEventListener('click', this.copyColor)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'color':
        const color = this._shadowRoot.querySelector('.color')
        this.color = newValue
        color.style.backgroundColor = newValue
        break
    }
  }

  async copyColor() {
    await navigator.clipboard.writeText(this.color)
    const toast = this._shadowRoot.querySelector('c-toast')
    toast.show()
    setTimeout(() => toast.hide(), 2000)
  }
}
