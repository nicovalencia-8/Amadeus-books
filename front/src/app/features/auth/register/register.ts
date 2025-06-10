import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [MatCardModule,
            MatButtonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            ReactiveFormsModule,
            CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  readonly form: FormGroup;
  hide = signal(true);
  loading = false;
  apiError = '';

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) {
      if (field === 'name') return 'Debe ingresar un nombre';
      if (field === 'lastname') return 'Debe ingresar un apellido';
      if (field === 'username') return 'Debe ingresar un usuario';
      if (field === 'email') return 'Debe ingresar un correo';
      if (field === 'password') return 'Debe ingresar una contraseña';
    }
    if (field === 'email' && control?.hasError('email')) {
      return 'Correo inválido';
    }
    return '';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister(){
    if(this.form.invalid) return;
    this.loading = true;
    this.apiError = '';

    const payload = {
      firstName: this.form.value.name,
      lastName: this.form.value.lastname,
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email
    };

    this.http.post<any>('http://localhost:5227/users/create', payload)
    .subscribe({
      next: (resp) => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.apiError = 'Hubo un error al rgistrarse. Untenta nuevamente'
      }
    });
  }

}
