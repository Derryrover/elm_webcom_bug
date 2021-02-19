class WebcomponentClick extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
    const self = this;

    const shadow = this.attachShadow({mode: 'open'});
    const button = document.createElement('button');
    shadow.appendChild(button);
    button.setAttribute('class','button_choose_folder');
    button.innerHTML = "Emit event";

    button.addEventListener("click", function () {
        const customEvent = new CustomEvent('created', {detail: ""});
        self.dispatchEvent(customEvent);
    })
    this.addEventListener('created', function (e) {
      console.log("event triggered as sensed by javascript: ", e.detail, e);
    }, false, true);
  }
}

customElements.define('webcomponent-click', WebcomponentClick);