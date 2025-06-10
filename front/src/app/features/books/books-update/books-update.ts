import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-update',
  imports: [MatCardModule,
            MatButtonModule,
            FormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            ReactiveFormsModule,
            CommonModule],
  templateUrl: './books-update.html',
  styleUrl: './books-update.css'
})
export class BooksUpdate {

  readonly form: FormGroup;
  loading = false;
  apiError = '';
  private id: string | null = null;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private http: HttpClient
  ){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.getBook(this.id);
    }
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
    });
  }

  getBook(id: string){
    this.loading = true;
    this.http.get<any>(`http://localhost:5227/books/${id}`)
    .subscribe({
      next: (resp) => {
        this.loading = false;
        const libro = resp.body;
        this.form.patchValue({
          title: libro.title,
          description: libro.description,
          author: libro.author,
          isbn: libro.isbn,
        });
      },
      error: (err) => {
        this.loading = false;
        this.apiError = 'Hubo un error al actualizar el libro. Untenta nuevamente'
      }
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

  onUpdate(){
    if(this.form.invalid) return;
    this.loading = true;
    this.apiError = '';

    const payload = {
      title: this.form.value.title,
      description: this.form.value.description,
      author: this.form.value.author,
      isbn: this.form.value.isbn
    };

    this.http.put<any>(`http://localhost:5227/books/${this.id}`, payload)
    .subscribe({
      next: (resp) => {
        this.loading = false;
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.loading = false;
        this.apiError = 'Hubo un error al actualizar el libro. Untenta nuevamente'
      }
    });
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }

}
