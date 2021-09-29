import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar color="primary">
      <button mat-button routerLink="/">Message Board</button>
      <button mat-button routerLink="/messages">Messages</button>
      <span style="flex: 1 1 auto"></span>
      <button *ngIf="!auth.isAuthnenticated" mat-button routerLink="/login">
        Login
      </button>
      <button *ngIf="!auth.isAuthnenticated" mat-button routerLink="/register">
        Register
      </button>
      <button *ngIf="auth.isAuthnenticated" mat-button routerLink="/user">
        Welcome {{ auth.name }}
      </button>
      <button *ngIf="auth.isAuthnenticated" mat-button (click)="auth.logout()">
        Logout
      </button>
    </mat-toolbar>
  `,
})
export class NavComponent {
  constructor(public auth: AuthService) {}
}
