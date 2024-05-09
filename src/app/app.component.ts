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
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';  // Import MatMenuModule
import { createPopper } from '@popperjs/core';
import {KeycloakService} from "keycloak-angular";
import keycloak, {KeycloakProfile} from "keycloak-js";
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [FormBuilder, Validators, AccountService, KeycloakService, Idle, Keepalive,KeycloakAngularModule], // Add Keepalive here
    imports: [MatMenuTrigger,MatMenuModule ,MatIconModule,KeycloakAngularModule,PdfViewerModule,CommonModule, RouterOutlet, MatToolbarModule, MatTabsModule, MatSlideToggleModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatSidenav, SidenavComponent]
})



export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;


  urls = { 
    cns: 'http://localhost:4200/upload' // Verify the shown ports
  }


  constructor(private keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.keycloak.init({
      config: {
        url: 'http://localhost:8080', // URL of the Keycloak server
        realm: 'banking-app', // Realm to be used in Keycloak
        clientId: 'banking-app' // Client ID for the application in Keycloak
      },
      // Options for Keycloak initialization
      initOptions: {
        onLoad: 'check-sso', // Action to take on load
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html' // URI for silent SSO checks
      },
      // Enables Bearer interceptor
      enableBearerInterceptor: true,
      // Prefix for the Bearer token
      bearerPrefix: 'Bearer',
      // URLs excluded from Bearer token addition (empty by default)
      //bearerExcludedUrls: []
    });

  }

  public login() {
    this.keycloak.login({
      acr: {
        values: ['normal'],
        essential: true
      }
    });
  }

  
  async logout() {
    try {
      console.log("log",this.urls.cns);
      await this.keycloak.logout(this.urls.cns);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
  

}