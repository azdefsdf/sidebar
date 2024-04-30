import { Component, OnInit,OnDestroy, Inject, Provider, APP_INITIALIZER, ApplicationConfig, importProvidersFrom  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, provideRouter } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { FormBuilder, Validators } from "@angular/forms";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { KeycloakAngularModule, KeycloakBearerInterceptor } from 'keycloak-angular';
import { AccountService } from './account.service';
import { Subject } from 'rxjs'; // Import for unsubscribe
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatMenuModule } from '@angular/material/menu';  // Import MatMenuModule
import { createPopper } from '@popperjs/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [FormBuilder, Validators, AccountService, KeycloakService, Idle, Keepalive,KeycloakAngularModule], // Add Keepalive here
    imports: [MatMenuModule ,MatIconModule,KeycloakAngularModule,PdfViewerModule,CommonModule, RouterOutlet, MatToolbarModule, MatTabsModule, MatSlideToggleModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatSidenav, SidenavComponent]
})



export class AppComponent implements OnInit  {
  title = 'sidebar';
  isLoggedIn!:false;
  helloText = '';

  public profile! : KeycloakProfile;
  constructor(public keycloakService : KeycloakService

  ) {
  }

  async ngOnInit() {
    if (await this.keycloakService.isLoggedIn()) {
      this.profile = await this.keycloakService.loadUserProfile();
    }
  }



  async handleLogin() {
    try {
      await this.keycloakService.login({
        redirectUri: window.location.origin
      });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  handleLogout(){
    this.keycloakService.logout(window.location.origin);
  }
 
}





