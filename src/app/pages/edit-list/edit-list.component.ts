import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId! : string

  constructor(private taskService: TaskService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) =>{
        if(params && params['listid']){
          this.listId = params['listid'];
        }
    })
  }

  editList(title:string){
    this.taskService.editList(this.listId,title).subscribe((res:any) =>{
      // Now navigate to /list/response_id
      this.router.navigate(['/list',this.listId])
      
    })
  }
}
