export class TodoItem extends HTMLElement {
    constructor(text, index, isComplete = false)
    {
        super();
        this._text = text;
        this._isSelected = false;
        this._isComplete = isComplete;
        this._index = index;
    }
    connectedCallback() {
        this.setAttribute("area-hidden", false);
        this.hydrate();
    }

    hydrate()
    {
        const templatesImport = document.getElementById('templates');
        const template = templatesImport.import.getElementById('todoItem');
        const todoContent = document.importNode(template.content, true);
        todoContent.querySelector('todoText').textContent = this._text;
        const cb = todoContent.querySelector('input');
        cb.checked = this._isComplete;
        cb.id = `cb${this._index}`;
        todoContent.querySelector('label').setAttribute("for", `cb${this._index}`);
        this.appendChild(todoContent);
    }

    get isSelected(){
        return this._isSelected;
    }

    updateCompleted(){
        const cb = this.querySelector('input');
        this._isComplete = !cb.checked;
    }

    toggleSelected()
    {
        this._isSelected = !this._isSelected;
        this.setAttribute("area-selected", this._isSelected);
    }

}
customElements.define("todo-item", TodoItem)
