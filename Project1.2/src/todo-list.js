import {TodoItem} from './todo-item.js';

export class TodoList extends HTMLElement {
        constructor() {
            super();
            this.storageKey = "ToDoList";
            this.clickHandler = this._click.bind(this);
            this._counter = 0;
        }
        connectedCallback() {
            this.addEventListener("click", this.clickHandler);
            this.items = [];
            this._loadLocalStorage();
        }

        disconnectedCallback() {
            this.removeEventListener("click", this.clickHandler);
        }

        _loadLocalStorage() {
            const todoListString = localStorage.getItem(this.storageKey);
            if (todoListString != undefined) {
                const todoList = JSON.parse(todoListString);
                for (let item of todoList) {
                    this._addFromStorage(item._text, item._isComplete);
                }
            }
        }

        addNewItem(todoText)
        {
            const item = new TodoItem(todoText, this._counter);
            this.appendChild(item);
            this.items.push(item);
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this._counter++;
        }

        _addFromStorage(todoText, isComplete) {
            const item = new TodoItem(todoText, this._counter, isComplete);
            this.appendChild(item);
            this.items.push(item);
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
            this._counter++;
        }

        deleteSelectedItems() {
            const deleteItems = [];
            for (let item of this.items) {
                if (item.isSelected)
                {
                    deleteItems.push(item)
                    this.removeChild(item);
                }
            }
            for (let itemToDelete of deleteItems) {
                const index = this.items.indexOf(itemToDelete);
                this.items.splice(index,1);
            }
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        }

        filter(text) {
            for (let item of this.items){
                const hidden = item.text.indexOf(text) <= -1;
                item.setAttribute("area-hidden", hidden);
            }
        }

        _click(event){
            if (event.target.tagName == "LABEL")
            {
                let parent = event.target.parentElement;
                parent.updateCompleted();
                localStorage.setItem(this.storageKey, JSON.stringify(this.items));
                return;
            }
            if (event.target.tagName == "INPUT")
            {
                return;
            }

            const itemTag = "TODO-ITEM";
            if (event.target.parentElement.tagName == itemTag) {
                event.target.parentElement.toggleSelected();
            }
            else
                if (event.target.tagName == itemTag) {
                event.target.toggleSelected();
            }
        }
    }
customElements.define("todo-list", TodoList)
