import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-register',
  imports: [MatCardModule,
            MatButtonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            ReactiveFormsModule,
            CommonModule],
  templateUrl: './books-register.html',
  styleUrl: './books-register.css'
})
export class BooksRegister {
  readonly form: FormGroup;
  loading = false;
  apiError = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
    });
  }

  getErrorMessage(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) {
      if (field === 'title') return 'Debe ingresar un titulo de libro';
      if (field === 'description') return 'Debe ingresar una descripción';
      if (field === 'author') return 'Debe ingresar un author';
      if (field === 'isbn') return 'Debe ingresar un isbn';
    }
    return '';
  }

  onCreate(){
    if(this.form.invalid) return;
    this.loading = true;
    this.apiError = '';

    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      author: this.form.value.author,
      isbn: this.form.value.isbn
    };

    this.http.post<any>('http://localhost:5227/books', payload)
    .subscribe({
      next: (resp) => {
        this.loading = false;
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.loading = false;
        this.apiError = 'Hubo un error al crear el libro. Untenta nuevamente'
      }
    });
  }

}
