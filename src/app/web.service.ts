import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable()
export class WebService {
  BASE_URL = 'http://localhost:3000/api';
  //BASE_URL = 'https://angular-with-node-backend.attilafarago.repl.co/api';

  private messageStore: Array<Message> = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable() as Observable<Array<Message>>;

  constructor(
    private http: HttpClient,
    private sb: MatSnackBar,
    private auth: AuthService
  ) {
    //    this.getMessages(null);
  }

  getMessages(user) {
    user = user ? '/' + user : '';
    this.http
      .get<Array<Message>>(this.BASE_URL + '/messages' + user, {
        responseType: 'json'
      })
      .subscribe(
        response => {
          this.messageStore = response;
          this.messageSubject.next(this.messageStore);
        },
        error => {
          this.handleError('Unable to get messages');
        }
      );
  }

  postMessage(message) {
    return this.http
      .post<Message>(
        this.BASE_URL + '/messages',
        message,
        this.auth.tokenHeader
      )
      .subscribe(
        response => {
          this.messageStore.push(response);
          this.messageSubject.next(this.messageStore);
          message.text = '';
        },
        error => {
          this.handleError('Unable to post message');
        }
      );
  }

  getUser() {
    return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader);
    //.pipe(map((res) => res.json()));
  }

  saveUser(userData) {
    return this.http.post(
      this.BASE_URL + '/users/me',
      userData,
      this.auth.tokenHeader
    );
  }

  private handleError(error) {
    this.sb.open(error, 'close', { duration: 2000 });
  }
}

export interface Message {
  text: string;
  owner: string;
}
