import { Component } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user',
  template: `
    <mat-card class="card">
      <mat-card-content>
        <mat-form-field>
          <input
            [(ngModel)]="model.firstName"
            matInput
            placeholder="First Name"
          />
        </mat-form-field>
        <mat-form-field>
          <input
            [(ngModel)]="model.lastName"
            matInput
            placeholder="Last Name"
          />
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="post()" mat-raised-button color="primary">
          Save Changes
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class UserComponent {
  constructor(
    private webService: WebService,
    private auth: AuthService,
    private sb: MatSnackBar
  ) {}

  model = {
    firstName: '',
    lastName: '',
  };

  ngOnInit() {
    this.webService.getUser().subscribe((res) => {
      this.model.firstName = res['firstName'];
      this.model.lastName = res['lastName'];
    });
  }

  post() {
    console.log('post');
    this.webService.saveUser(this.model).subscribe(
      (res) => {
        this.auth.updateUser(this.model);
        this.sb.open('User data updated', 'close', { duration: 2000 });
      },
      (error) => {
        this.sb.open('Error updating user data', 'close', { duration: 2000 });
      }
    );
  }
}
