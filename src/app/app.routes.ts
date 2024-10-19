import { Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
    {
        path:'student',
        component:StudentsComponent
    },{
        path:'',
        redirectTo : 'student',
        pathMatch:'full'
    }

];
