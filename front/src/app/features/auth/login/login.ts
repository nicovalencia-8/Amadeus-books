import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,
            MatButtonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            ReactiveFormsModule,
            CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

readonly form: FormGroup;

  loading = false;
  apiError = '';

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) {
      if (field === 'username') return 'Debe ingresar un usuario';
      if (field === 'password') return 'Debe ingresar una contraseña';
    }
    return '';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  onLogin(){

    if(this.form.invalid) return;
    this.loading = true;
    this.apiError = '';

    const payload = {
      type: 'authorization',
      user: this.form.value.username,
      password: this.form.value.password
    };

    this.http.post<any>('http://localhost:5227/users/token', payload)
    .subscribe({
      next: (resp) => {
        this.loading = false;

        const accessToken = resp.body?.accessToken;
        const refreshToken = resp.body?.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.loading = false;
        this.apiError = 'Hubo un error al iniciar sesión. Untenta nuevamente'
      }
    });


  }

}
