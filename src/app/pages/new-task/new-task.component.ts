import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId!: string;
  constructor(private taskService: TaskService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) =>{
      this.listId = params['listid'];
    })
  }

  createTask(taskName:string){
    this.taskService.createTask(this.listId,taskName).subscribe((res:any) =>{
      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }
}
