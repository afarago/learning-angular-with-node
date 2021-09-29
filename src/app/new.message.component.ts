import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'new-message',
  template: `
    <mat-card class="card">
      <mat-card-title>New Message</mat-card-title>
      <mat-form-field>
        <textarea
          [(ngModel)]="message.text"
          matInput
          placeholder="Message"
          cdkTextareaAutosize
          #autosize="cdkTextareaAutosize"
          cdkAutosizeMinRows="1"
          cdkAutosizeMaxRows="5"
        ></textarea>
      </mat-form-field>
      <button (click)="post()" mat-button color="primary">Post</button>
    </mat-card>
  `
})
export class NewMessagesComponent {
  constructor(private webService: WebService, private auth: AuthService) {}

  @Input() message = {
    // owner: this.auth.name,
    text: ''
  };

  post() {
    this.webService.postMessage(this.message);
    //TODO: how to chain observable? - theoretical question
  }
}
