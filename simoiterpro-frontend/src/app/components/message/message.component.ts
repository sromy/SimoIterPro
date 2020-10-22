import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private subscription: Subscription;
  message: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
              message.cssClass = 'alert alert-success';
              break;
          case 'error':
              message.cssClass = 'alert alert-danger';
              break;
        }

        this.message = message;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
