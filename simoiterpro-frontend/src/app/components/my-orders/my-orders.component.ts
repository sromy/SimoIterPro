import {  Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UserService} from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  myorders: Order[] = [];
  userId: string;
  modalRef: BsModalRef;
  orderForm: FormGroup;
  selectedOrder: Order;

  constructor(private formBuilder: FormBuilder, 
    private modalService: BsModalService, 
    private userService: UserService,
    private messageService: MessageService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserInfo().value.id;
    this.getAllMyOrders();
  }

  getAllMyOrders() {
    this.orderService.getOrdersByUser(this.userId)
      .subscribe(data => {
        this.myorders = data;
      });
  }

  showOrder(template: TemplateRef<any>, order: Order) {   
    this.orderForm = this.formBuilder.group({      
      'orderId' : [{value: order.orderId, disabled: true}],
      'creationDate' : [{value: order.creationDate, disabled: true}],
      'total' : [{value: order.total, disabled: true}]
    });
    this.selectedOrder = order;  
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

}
