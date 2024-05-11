export class List{
    _id:string;
    list_name:string;

    constructor(id: string, list_name: string) {
        this._id = id;
        this.list_name = list_name;
    }
}