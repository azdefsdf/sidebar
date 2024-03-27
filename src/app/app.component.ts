import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { MySharedComponent } from './my-shared/my-shared.component';
import { FormBuilder, Validators } from "@angular/forms";
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers:[FormBuilder,Validators],
    imports: [PdfViewerModule,MySharedComponent,CommonModule, RouterOutlet, MatToolbarModule, MatTabsModule, MatSlideToggleModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatSidenav, SidenavComponent]
})
export class AppComponent {
  title = 'sidebar';
}
