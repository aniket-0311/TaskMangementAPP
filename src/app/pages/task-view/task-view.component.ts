import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private route:ActivatedRoute,private taskService: TaskService) { }
  listArr: any[] = [];
  tasks: any[] = [];
  showGearDropdown: boolean = false;
  selectedListId!: string;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        // Call taskService to get tasks based on list ID
        if(params && params['listid']){
          this.selectedListId = params['listid'];
          this.taskService.getTasks(params['listid']).subscribe(
            (tasks: any) => {
              this.tasks = tasks;
            },
            (error: any) => {
              console.error("Failed to fetch tasks:", error);
            }
          );
        }
      }
    );
    this.getAllList();
  }
  
  getAllList():void{
    this.taskService.getAllList().subscribe((res:any) =>{
      if(res.result && res.data){
        this.listArr = res.data;
      }
      else {
        console.error("Response doesn't contain data:", res);
      }
    },(error: any) => {
      console.error("Failed to fetch lists:", error);
    })
  }

  isListSelected(): boolean {
    return document.querySelectorAll('.list-menu-item.is-active').length > 0;
  }

  onTaskClick(task:any){
    this.taskService.complete(task).subscribe((res) =>{
      task.completed = !task.completed;
    })
  }

  onGearIconClick(){
    this.showGearDropdown = !this.showGearDropdown;
  }

  onDeleteList(){
    this.taskService.deleteList(this.selectedListId).subscribe((res:any) =>{
      if(res){
        this.listArr = this.listArr.filter(ele => ele._id !== this.selectedListId);
        this.tasks = [];
      }
      else{
        console.error("Error while deleting",res)
      }
      this.showGearDropdown = false;
    })
  }

  onDeleteTask(taskId:string){
    this.taskService.deleteTask(this.selectedListId,taskId).subscribe((res:any) =>{
      if(res){
        this.tasks = this.tasks.filter(ele => ele._id !== taskId);
      }
      else{
        console.error("Error while deleting",res)
      }
      this.showGearDropdown = false;
    })
  }
}
