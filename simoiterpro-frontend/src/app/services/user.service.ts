import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular'
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from '../models/user'
import { Order } from '../models/order'
import { OrderItem } from '../models/orderitem'
import { Product } from '../models/product'

import { tap,map } from 'rxjs/operators';
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
              this.userDetails.order = {items:[]} as Order;
              this.userDetails.id = this.keycloakService.getKeycloakInstance().subject;
              this.userPrincipal$.next(this.userDetails);    
          }) 
        ).subscribe();
      }  else {
        console.log('User Principal already init')
      }    

    }

    return this.userPrincipal$;

  }

  addOrderItem(productitem: Product) {
    let orderitem = {product:productitem,quantity:productitem.quantity }
    this.userDetails.order.items.push(orderitem)
  }

  updateOrderItem(productitem: Product) {
    
    let orderitems =  this.userDetails.order.items;
    let orderitemIndex = this.userDetails.order.items.findIndex(item => item.product.name === productitem.name)

    orderitems[orderitemIndex] = {
      quantity: productitem.quantity,
      product : productitem
    }
    
    this.userDetails.order.items = orderitems;
     
  }

  getCurrentOrder() {
    return this.userDetails.order;
  }

  logout = async (): Promise<void> => {
    await this.keycloakService.logout();
    this.userPrincipal$ = (undefined);
  }

}
