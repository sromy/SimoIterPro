import { KeycloakProfile } from 'keycloak-js';
import { Order } from './order';

export interface UserInfo extends KeycloakProfile {
    isLoggedIn?: boolean | false;
    isAdministrator?: boolean | false;
    order?: Order;
}
