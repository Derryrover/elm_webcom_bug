class WebcomponentDummieClick extends HTMLElement {
  
  static get observedAttributes() { 
    return [
    "requeststate"
    ]; 
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case  "requeststate":
        if (newValue === "requested") {
          this.button.click();
        }
    }
  }
  
  constructor() {
    // Always call super first in constructor
    super();
    const self = this;

    const shadow = this.attachShadow({mode: 'open'});
    const button = document.createElement('button');
    this.button = button;
    shadow.appendChild(button);
    button.setAttribute('id','button_id_dummie');
    button.innerHTML = "Emit event";

    button.addEventListener("click", function () {
        const customEvent = new CustomEvent('created', {detail: ""});
        self.dispatchEvent(customEvent);
    })
  }
}

customElements.define('webcomponent-dummie-click', WebcomponentDummieClick);