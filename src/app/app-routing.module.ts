import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent, // Use the layout component for these routes
    children: [
      { path: 'newlist', component: NewListComponent },
      { path: 'list', component: TaskViewComponent },
      { path: 'list/:listid', component: TaskViewComponent },
      { path: 'edit-list/:listid', component: EditListComponent },
      { path: 'list/:listid/newtask', component: NewTaskComponent },
      { path: 'list/:listid/editTask/:taskid', component: EditTaskComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' } // Redirect to 'list' by default
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
