import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'messages',
  template: `
    <div *ngFor="let message of webService.messages | async">
      <mat-card class="card" [ngClass]="{ ownmessage: isOwnMessage(message) }">
        <mat-card-title
          [routerLink]="['/messages', message.owner]"
          style="cursor:pointer"
          color="$mat-grey"
          >{{ message.owner }}
        </mat-card-title>
        <mat-card-content>
          {{ message.text }}
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .ownmessage {
        color: #ccc;
      }
    `,
  ],
})
export class MessagesComponent {
  constructor(
    public webService: WebService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    var name = this.route.snapshot.params.name;
    this.webService.getMessages(name);
    this.webService.getUser().subscribe();
  }

  isOwnMessage(message) {
    return this.auth.name == message.owner;
  }
}
