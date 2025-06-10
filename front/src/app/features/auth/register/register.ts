import { Component, signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

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
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder, private router: Router) {
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

}
