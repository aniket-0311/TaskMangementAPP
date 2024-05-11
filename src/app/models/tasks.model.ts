export class Task {
    _id:string
    list_id: string;
    task_name: string;

    constructor(id: string, listId: string, name: string) {
        this._id = id;
        this.list_id = listId;
        this.task_name = name;
    }
}