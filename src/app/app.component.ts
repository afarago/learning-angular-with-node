import { Component } from '@angular/core';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-root',
  template: `
    <nav></nav>
    <router-outlet></router-outlet>
    <footer>
      <mat-toolbar class="mat-hue-2" color="primary">
        <span style="flex: 1 1 auto"></span>
        <span>Building Angular and Node Apps with Authentication</span>
        <span>·</span>
        <a mat-button href="https://www.linkedin.com/in/afarago/"
          >Attila Farago · last update 2021 for Angular 12</a
        >
        ·
        <a
          mat-button
          href="https://www.linkedin.com/learning/building-angular-and-node-apps-with-authentication/"
          >Course 2019 by Alex Zanfir</a
        >
      </mat-toolbar>
    </footer>
  `,
  styleUrls: ['./app.component.css'],
  styles: [
    `
      footer {
        position: fixed;
        bottom: 0px;
        width: 100%;
      }
      footer * {
        font-size: 14px;
      }
      footer span {
        margin: 0px 8px;
      }
    `,
  ],
})
export class AppComponent {}
