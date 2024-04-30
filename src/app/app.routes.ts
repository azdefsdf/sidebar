import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { DoneComponent } from './pages/done/done.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'upload', component: UploadComponent},
    { path: 'done', component: DoneComponent, canActivate : [AuthGuard], data : {roles :['ADMIN']} },
    { path: 'logout', component: LogoutComponent, canActivate : [AuthGuard], data : {roles :['ADMIN']} },
    { path: 'progress', component: ProgressComponent, canActivate : [AuthGuard], data : {roles :['ADMIN']} },
    { path: 'dashbord', component: LogoutComponent, canActivate : [AuthGuard], data : {roles :['MANGER']} },
];
