class Webcomponent extends HTMLElement {

  static get observedAttributes() { 
    return [
    "requeststate"
    ]; 
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case  "requeststate":
        if (newValue === "requested") {
          console.log(`requested in webcomponent triggered`);
          const customEvent = new CustomEvent('created', {detail: ""});
          this.dispatchEvent(customEvent);
        }
    }
  }
  
  constructor() {
    super();
    
    this.addEventListener('created', function (e) {
      console.log("event triggered as sensed by javascript: ", e.detail, e);
    }, false, true);
    
  }
}

customElements.define('webcomponent-test', Webcomponent);