import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  BASE_URL = 'https://angular-with-node-backend.attilafarago.repl.co/auth';
  //BASE_URL = 'http://localhost:3000/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private sb: MatSnackBar
  ) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthnenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem(this.TOKEN_KEY)
    );
    return { headers: header };
  }

  get userName() {
    return localStorage.getItem(this.NAME_KEY);
  }

  login(loginData) {
    console.log(loginData);
    this.http.post(this.BASE_URL + '/login', loginData).subscribe(
      res => {
        this.authenticate(res);
      },
      error => {
        this.handleError('Unable to login');
        console.log(error);
      }
    );
  }

  register(user) {
    delete user.confirmPassword;
    this.http.post(this.BASE_URL + '/register', user).subscribe(
      res => {
        this.authenticate(res);
      },
      error => {
        this.handleError('Unable to register');
      }
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.NAME_KEY);
    this.router.navigate(['/']);
  }

  private authenticate(res) {
    var authResponse = res;

    if (!authResponse['token']) return;

    localStorage.setItem(this.NAME_KEY, authResponse['firstName']);
    localStorage.setItem(this.TOKEN_KEY, authResponse['token']);

    this.router.navigate(['/']);
  }

  updateUser(userData) {
    localStorage.setItem(this.NAME_KEY, userData['firstName']);
  }

  private handleError(error) {
    console.error(error);
    this.sb.open(error, 'close', { duration: 2000 });
  }
}
