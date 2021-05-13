import { createTemplate } from '../../helpers/createTemplate.js'
import { relativeToModule } from "../../helpers/relativeToModule.js";

const template = createTemplate(`
  <template>
    <link rel="stylesheet" href="${relativeToModule(import.meta.url, '../../typography/typography.css')}">
    <style>
      :host {
        display: block;
      }
    
      .intro-section {
        overflow: hidden;
      }
      
      h2 {
        color: var(--primary);
        margin-top: 0;
      }
    
      img {
        float: left;
      }
      
      p {
        color: var(--secondary);
      }
    </style>
    <div class="intro-section">
      <h2>Intro Section</h2>
      <img src="">
      <p>
        Some text
      </p>
    </div>
  </template>
`)

export class IntroSection extends HTMLElement {
  static get observedAttributes() {
    return [
      'title',
      'imageUrl',
      'paragraphText'
    ]
  }

  constructor() {
    super()
    const templateContent = template.content
    this._shadowRoot = this.attachShadow({mode: 'closed'})
    this._shadowRoot.appendChild(templateContent.cloneNode(true))
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'title':
        const title = this._shadowRoot.querySelector('h2')
        title.textContent = newValue
        break
      case 'imageUrl':
        const image = this._shadowRoot.querySelector('img')
        image.src = newValue
        break
      case 'paragraphText':
        const paragraph = this._shadowRoot.querySelector('p')
        paragraph.textContent = newValue
        break
    }
  }
}
