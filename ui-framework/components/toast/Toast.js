import { createTemplate } from '../../helpers/createTemplate.js'

const template = createTemplate(`
  <template>
    <link rel="stylesheet" href="/ui-framework/typography/typography.css">
    <style>
      :host {
        display: inline-block;
      }
    
      .toast {
        position: absolute;
        bottom: 0.5rem;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        transition-property: opacity;
        transition-duration: 1s;
        pointer-events: none;
      }
    
      .toast__inner {
        border-radius: 9px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 1rem;
        text-align: center;
        font-family: sans-serif;
        pointer-events: initial;
      }
    </style>
    <div class="toast">
      <div class="toast__inner">
        <slot />
      </div>
    </div>
  </template>
`)

export class Toast extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    this._shadowRoot = this.attachShadow({mode: 'closed'})
    this._shadowRoot.appendChild(templateContent.cloneNode(true))

    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  show() {
    const toast = this._retrieveToast()
    toast.style.opacity = 1
  }

  hide() {
    const toast = this._retrieveToast()
    toast.style.opacity = 0
  }

  _retrieveToast() {
    return this._shadowRoot.querySelector('.toast')
  }
}
