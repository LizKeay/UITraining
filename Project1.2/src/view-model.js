export class ViewModel {
    constructor() {
        this.btnAdd = document.querySelector("#btnAdd");
        this.btnDelete = document.querySelector("#btnDelete");
        this.edtFilter = document.querySelector("#edtFilter");
        this.todoList = document.querySelector("todo-list");

        this.btnAdd.addEventListener("click", this.btnAddClick.bind(this));
        this.btnDelete.addEventListener("click", this.btnDeleteClick.bind(this));
        this.edtFilter.addEventListener("keyup", this.edtFilterKeyup.bind(this));
    }

    dispose() {
        this.btnAdd.removeEventListener(this.btnAddClickHandler);
        this.btnDelete.removeEventListener(this.btnDeleteClickHandler);
        this.edtFilter.removeEventListener("change", this.edtFilterChangeHandler);

        delete this.btnAdd;
        delete this.btnDelete;
        delete this.edtFilter;
        delete this.todoList;
    }

    btnAddClick(){
        const todoText = prompt("What must I do?", "I must");
        if (todoText != undefined) {
         this.todoList.addNewItem(todoText);
        }
    }

    btnDeleteClick(){
        this.todoList.deleteSelectedItems();
    }

    edtFilterKeyup(event){
        this.todoList.filter(event.target.value);
    }
}