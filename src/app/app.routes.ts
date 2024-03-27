import { Routes } from '@angular/router';
import { UploadComponent } from './pages/upload/upload.component';
import { DoneComponent } from './pages/done/done.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'upload' },
    { path: 'upload', component: UploadComponent },
    { path: 'done', component: DoneComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'logout', component: LogoutComponent },

];
