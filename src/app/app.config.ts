import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UploadComponent } from './pages/upload/upload.component';
import { DoneComponent } from './pages/done/done.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MySharedComponent } from './my-shared/my-shared.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),importProvidersFrom(HttpClientModule)]
};
