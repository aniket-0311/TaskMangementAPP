import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webServeice:WebRequestService) { }

  createList(list_name:string){
    return this.webServeice.post('create-list',{list_name});
  }

  editList(listId:string,list_name:string){
    return this.webServeice.put(`list/${listId}`,{list_name});
  }

  deleteList(listId:string){
    return this.webServeice.delete(`list/${listId}`);
  }

  getAllList(){
    return this.webServeice.get('getAllList');
  }

  getTasks(listid:string){
    return this.webServeice.get(`list/${listid}/tasks`);
  }

  createTask(listid:string,taskName:string){
    return this.webServeice.post(`list/${listid}/tasks`,{taskName});
  }

  editTask(listid:string,taskid:string,taskName:string){
    return this.webServeice.put(`list/${listid}/tasks/${taskid}`,{taskName});
  }

  deleteTask(listId:string,taskId:string){
    return this.webServeice.delete(`list/${listId}/tasks/${taskId}`);
  }

  complete(task:any){
    return this.webServeice.put(`list/${task.list_id}/tasks/${task._id}`,{completed:!task.completed});
  }
}
