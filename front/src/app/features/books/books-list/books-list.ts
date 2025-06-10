import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  imports: [MatTableModule,
            MatPaginatorModule,
            MatButtonModule,
            MatIconModule],
  templateUrl: './books-list.html',
  styleUrl: './books-list.css'
})
export class BooksList {
  displayedColumns: string[] = ['Id', 'Titulo', 'Descripcion', 'Autor', 'ISBN', "Acciones"];
  dataSource = new MatTableDataSource<Book>([]);
  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  constructor( private router: Router, private http: HttpClient) {

  }

  ngAfterViewInit() {
     this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadBooks();
    });
    this.loadBooks();
  }

  loadBooks() {
    this.http.get<BooksResponse>(`http://localhost:5227/books?page=${this.pageIndex}&size=${this.pageSize}`)
      .subscribe(resp => {
        const books = resp.body.content;
        this.dataSource.data = books;
        this.totalElements = resp.body.totalElements;
      });
  }

  onEdit(book: Book) {
    this.router.navigate(['/edit', book.id]);
  }

  onDetails(book: Book) {
    this.router.navigate(['/details', book.id]);
  }

  onDelete(book: Book) {
    if (confirm(`¿Seguro que quieres eliminar el libro "${book.title}"?`)) {
      this.http.delete(`http://localhost:5227/books/${book.id}`).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  goToCreateBook(){
    this.router.navigate(['/create']);
  }

  logout(){
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  this.router.navigate(['/login']);
  }

}

export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  isbn: string;
}

export interface BooksResponse {
  statusCode: number;
  status: string;
  message: string;
  body: {
    content: Book[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
