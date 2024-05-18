import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly keycloakService: KeycloakService) {}

  async init(): Promise<void> {
    console.log('Initializing Keycloak...');
    await this.keycloakService.init({
      config: {
        url: 'https://192.168.195.128:8081', // Replace with your Keycloak server URL
        realm: 'banking-app', // Replace with your Keycloak realm
        clientId: 'banking-app' // Replace with your Keycloak client ID
      }
    });
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  async logout(): Promise<void> {
    await this.keycloakService.logout();
  }

  // Add other Keycloak-related methods as needed
}
