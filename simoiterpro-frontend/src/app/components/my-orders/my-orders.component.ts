import {  Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { UserService} from '../../services/user.service';
import { MessageService } from '../../services/message.service';
import { OrderService } from '../../services/order.service';

import { Order } from '../../models/order';
import { Filter } from 'src/app/models/filter';

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
  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private modalService: BsModalService, 
    private userService: UserService,
    private messageService: MessageService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.userId = this.userService.getUserInfo().value.id;
    //this.getAllMyOrders();
    this.searchForm = this.formBuilder.group({
      'startDate' : [null],
      'endDate' : [null],
      'minTotal' : [null] ,     
      'maxTotal' : [null] 
    });
  }

  getAllMyOrders() {
    this.orderService.getOrdersByUser(this.userId)
      .subscribe(data => {
        this.myorders = data;
      });
  }

  showOrder(template: TemplateRef<any>, order: Order) {  
    let dp = new DatePipe(navigator.language);
    let p = 'y-MM-dd HH:mm'; // YYYY-MM-DD
    let creationDate = dp.transform(order.creationDate, p); 
    this.orderForm = this.formBuilder.group({      
      'orderId' : [{value: order.orderId, disabled: true}],
      'creationDate' : [{value: creationDate, disabled: true}],
      'total' : [{value: order.total, disabled: true}]
    });
    this.selectedOrder = order;  
    this.modalRef = this.modalService.show(template, {ignoreBackdropClick: true});
  }

  searchOrderByFilters() {
    let filters = <Filter>this.searchForm.value;
    filters.userId = this.userId;
    this.orderService.getOrdersByFilters(filters)
      .subscribe(data => {
        this.myorders = data;
      });
  }

}
