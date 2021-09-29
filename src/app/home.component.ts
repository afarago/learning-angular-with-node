import { Component } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessagesComponent } from './new.message.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'home',
  template: `
    <new-message *ngIf="auth.isAuthnenticated"></new-message>
    <messages></messages>
  `,
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
