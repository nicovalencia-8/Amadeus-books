import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books-detail',
  imports: [MatCardModule,
            MatButtonModule,
            MatIconModule,
            CommonModule],
  templateUrl: './books-detail.html',
  styleUrl: './books-detail.css'
})
export class BooksDetail {

  private id: string | null = null;
  apiError = '';

  book = {
    title: '',
    author: '',
    description: '',
    isbn: ''
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient
  ){
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id !== null) {
      this.getBook(this.id);
    }
  }

  getBook(id: string){
    this.http.get<any>(`http://localhost:5227/books/${id}`)
    .subscribe({
      next: (resp) => {
        this.book = resp.body;
      },
      error: (err) => {
        this.apiError = 'Hubo un error al consultar el libro. Untenta nuevamente'
      }
    });
  }

  goToBooks() {
    this.router.navigate(['/books']);
  }

}
