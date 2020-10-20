import { KeycloakProfile } from 'keycloak-js';

export interface UserInfo extends KeycloakProfile {
    isLoggedIn?: boolean | false;
    isAdministrator?: boolean | false;
}
