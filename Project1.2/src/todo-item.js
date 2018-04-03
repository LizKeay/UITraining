import {ToggleButton} from './toggle-button.js';

export class TodoItem extends HTMLElement {
    constructor(text, isComplete = false)
    {
        super();
        this._text = text;
        this.innerHTML = '<todoText>' + text + '</todoText>';
        this._isSelected = false;
        this._isComplete = isComplete;
        this._toggleButton = new ToggleButton(isComplete);
        this.appendChild(this._toggleButton);
    }
    connectedCallback() {
        this.setAttribute("area-hidden", false)
    }

    get text() {
        return this._text;
    }

    get isSelected(){
        return this._isSelected;
    }

    get isComplete(){
        return this._isComplete;
    }

    toggleComplete(){
        this._isComplete = !this._isComplete;
        this._toggleButton.toggle();
    }

    toggleSelected()
    {
        this._isSelected = !this._isSelected;
        this.setAttribute("area-selected", this._isSelected);
    }
}
customElements.define("todo-item", TodoItem)
