import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'http://keycloak:8080/auth',
  realm: 'simoiterprorealm',
  clientId: 'simoiterpro'
};

export const environment = {
  production: true,
  keycloak: keycloakConfig,
  backend: {
    baseURL:"http://backend:8081"
  }
};