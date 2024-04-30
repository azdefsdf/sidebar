export const environment = {
    production: false,
    keycloak: {
      authority: 'http://localhost:8080',
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: 'http://localhost:4200/logout',
      realm: 'banking-app',
      clientId: 'banking-app',
    },
    idleConfig: { idle: 10, timeout: 60, ping: 10 },
  };
  