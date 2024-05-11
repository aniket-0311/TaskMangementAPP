import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  listId! : string
  taskId! : string
  
  constructor(private route:ActivatedRoute,private router:Router,private taskService:TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        if(params && params['listid']){
          this.listId = params['listid'];
          this.taskId = params['taskid'];
        }
    })
  }

  editTask(title:string){
    this.taskService.editTask(this.listId,this.taskId,title).subscribe((res:any) =>{
      // Now navigate to /list/response_id
      if(res){
        this.router.navigate(['/list',this.listId])
      }      
    })
  }

}
