import { createTemplate } from './createTemplate.js'

const template = createTemplate(`
  <template>
    <style>
      .box {
        width: 2rem;
        height: 2rem;
        background-color: blue;
      }  
    </style>
    <div class="box"></div>
  </template>
`)

export class CustomWebComponent extends HTMLElement {
  constructor() {
    super()
    const templateContent = template.content
    const shadowRoot = this.attachShadow({mode: 'closed'})
    shadowRoot.appendChild(templateContent.cloneNode(true))
  }
}
