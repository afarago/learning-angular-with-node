import { Component } from '@angular/core';
import { FormBuilder, NgControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  //moduleId: module.id,
  selector: 'register',
  templateUrl: 'register.component.html',
  styles: [
    `
      .error {
        background-color: #fff0f0;
      }
      mat-form-field {
        width: 350px;
      }
    `,
  ],
})
export class RegisterComponent {
  form;

  //get firstName() { return this.form.get('firstName'); }

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.form = fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [emailValid(), Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchingFields('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    console.log(this.form.errors);
    //!! TODO: emailvalidator not reachtig to this - this.form.errors
    // if (!!this.form.errors) {
    //     debugger;
    // }
    this.auth.register(this.form.value);
  }

  isValid(control: string) {
    return (
      this.form.controls[control].invalid && this.form.controls[control].touched
    );
  }
}

function matchingFields(field1, field2) {
  return (form) => {
    if (form.controls[field1].value !== form.controls[field2].value) {
      return { mismatchedFields: true };
    } else {
      return null;
    }
  };
}

function emailValid() {
  return (control) => {
    var regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : { invalidEmail: true };
  };
}
