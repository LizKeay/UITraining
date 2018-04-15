export class TodoItem extends HTMLElement {
    constructor(text, index, isComplete = false)
    {
        super();
        this._text = text;
        this._isSelected = false;
        this._isComplete = isComplete;
        let template = document.querySelector('#todoItem');
        let todoContent = document.importNode(template.content, true);
        todoContent.querySelector('todoText').textContent = text;
        let cb = todoContent.querySelector('input');
        cb.id = `cb${index}`;
        todoContent.querySelector('label').setAttribute("for", `cb${index}`);
        cb.checked = isComplete;
        this.appendChild(todoContent);
    }
    connectedCallback() {
        this.setAttribute("area-hidden", false)
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
