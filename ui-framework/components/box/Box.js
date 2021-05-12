import { createTemplate } from '../../helpers/createTemplate.js'

const template = createTemplate(`
  <template>
    <style>
      .box {
        border: 1px solid black;
        border-radius: 9px;
        padding: 0.5rem;
      }
    </style>
    <div class="box">
      <slot />
    </div>
  </template>
`)

export class Box extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    this._shadowRoot = this.attachShadow({mode: 'closed'})
    this._shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
