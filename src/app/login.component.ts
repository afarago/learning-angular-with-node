import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  template: `
    <mat-card>
      <mat-card-content>
        <mat-form-field>
          <input
            matInput
            [(ngModel)]="loginData.email"
            type="email"
            placeholder="Email"
          />
          <mat-hint>Sample email is 'a'</mat-hint>
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            [(ngModel)]="loginData.password"
            type="password"
            placeholder="Password"
          />
          <mat-hint>Sample password is 'a'</mat-hint>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="login()">
          Login
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  loginData = {
    email: '',
    password: '',
  };

  login() {
    this.auth.login(this.loginData);
  }
}
