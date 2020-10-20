import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular'
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user'

import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userPrincipal$: BehaviorSubject<UserInfo>;
  private userDetails: UserInfo;
  loggedIn: boolean;
  
  constructor(private keycloakService: KeycloakService) { }

  async getUserProfile() {
    this.userDetails = await this.keycloakService.loadUserProfile();          
  }

  getUserInfo(){
    if (this.keycloakService.isLoggedIn()) {
      
      if (!this.userPrincipal$) {
        this.getUserProfile(); 
        this.userPrincipal$ = new BehaviorSubject(null);
        from(this.keycloakService.loadUserProfile()).pipe(
          map(() => {            
              this.userDetails.username = this.keycloakService.getUsername();              
              this.userDetails.isAdministrator = this.keycloakService.isUserInRole("admin");
              this.userDetails.isLoggedIn = true; 
              this.userPrincipal$.next(this.userDetails);                                   
          }) 
        ).subscribe();
      }  else {
        console.log('gia')
      }    

    }

    return this.userPrincipal$;

  }

  logout = async (): Promise<void> => {
    await this.keycloakService.logout();
    this.userPrincipal$ = (undefined);
  }

}
