import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formRegister!: FormGroup;
  errMessage: string = '';
  isLoading: boolean = false;
  constructor(
    private auth: Auth,
    private router: Router,
  ) {
    this.formRegister = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  onSubmit() {
    if (this.formRegister.valid) {
      this.errMessage = '';
      this.isLoading = true;
      this.auth
        .login(this.formRegister.value.username, this.formRegister.value.password)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            this.router.navigate(['']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errMessage = err.error;
          },
        });
    }
  }

  onReset() {
    this.formRegister.reset();
  }
}
