import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { last } from 'rxjs';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formRegister!: FormGroup;
  submittedData: any = null;
  errMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [(Validators.required, Validators.email)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchPassword]),
    });
  }

  onSubmit() {
    if (this.formRegister.valid) {
      this.isLoading = true;
      this.auth
        .register(
          this.formRegister.value.firstName,
          this.formRegister.value.lastName,
          this.formRegister.value.email,
          this.formRegister.value.password,
          this.formRegister.value.confirmPassword,
        )
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.log(err.error);
            this.errMessage = err.error.message;
            this.isLoading = false;
          },
        });
    }
    this.submittedData = this.formRegister.value;
    console.log(this.submittedData);
  }

  onReset() {
    this.formRegister.reset();
    this.submittedData = null;
  }
  matchPassword = (control: FormControl): { [key: string]: boolean } | null => {
    const password = control.parent?.get('password')?.value;
    return password === control.value ? null : { mismatch: true };
  };
}
