export class ToggleButton extends HTMLElement {
    constructor(isComplete)
    {
        super();
        this._isOn = isComplete;
    }

    connectedCallback() {
        this._updateState();
    }

    toggle(){
        this._isOn = !this._isOn;
        this._updateState();
    }

    _updateState() {
        this.setAttribute("is-on", this._isOn);
    }
}
customElements.define("toggle-button", ToggleButton)
