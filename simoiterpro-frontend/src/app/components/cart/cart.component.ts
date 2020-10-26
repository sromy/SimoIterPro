import {  Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UserService} from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';

import { UserInfo } from '../../models/user'
import { OrderItem } from '../../models/orderitem';
import { Order } from '../../models/order';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  userinfo$: Observable<UserInfo>;
  selectedOrderItem: OrderItem;
  orderItemForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder, 
              private modalService: BsModalService, 
              private userService: UserService,
              private messageService: MessageService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.userinfo$ = this.userService.getUserInfo().asObservable(); 
  } 

  // convenience getter for easy access to form fields
  get f() { 
    return this.orderItemForm.controls; 
  }

  openEditOrderItemModal(template: TemplateRef<any>, orderitem: OrderItem) {   
    this.orderItemForm = this.formBuilder.group({      
      'productId' : [{value: orderitem.product.productId, disabled: true}],
      'name' : [{value: orderitem.product.name, disabled: true}],
      'price' : [{value: orderitem.product.price, disabled: true}],
      'quantity' : [orderitem.quantity, Validators.required]
    });
    this.selectedOrderItem = orderitem;
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  onUpdateOrderItem() {
    if (this.orderItemForm.invalid) {
      return;
    }
    let orderitem = <Product>this.orderItemForm.getRawValue();
    this.userService.updateOrderItem(orderitem);
    this.modalRef.hide();
    this.messageService.success(`${orderitem.name} order quantity updated from ${this.selectedOrderItem.quantity} to ${orderitem.quantity}.`);
  };

  onCreateOrder() {
    
    let order = this.userService.getUserInfo().value.order;
    let userid = this.userService.getUserInfo().value.id;
    this.orderService.createOrder(userid,order)
      .subscribe(res => {
        this.userService.getUserInfo().value.order = {items:[]} as Order;
        this.messageService.success(`Order id ${res.orderId} created!!`);
      });            
  };

}
