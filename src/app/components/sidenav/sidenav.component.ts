import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,CommonModule, MatListModule,MatSidenavModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  isLoading = false;
  isOpen = true;
  

  ngOnInit() {
    // Simulate loading logic (replace with your actual logic)
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); // Simulate 1 second loading time
  }


  toggleSidenav() {
    this.isOpen = !this.isOpen;
  }

  
  menuItems = signal<MenuItem[]> ([
    {
      icon: 'cloud_upload',
      label: 'Upload Documents',
      route: 'upload'
    },
    {
      icon: 'cloud_sync',
      label: 'progress Documents',
      route: 'progress'
    },
    {
      icon: 'cloud_done',
      label: 'Done Documents',
      route: 'done'
    },
    {
      icon: 'logout',
      label: 'Insert Data',
      route: 'logout'
    }
  ])
}
