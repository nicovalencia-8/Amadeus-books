import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { BooksList } from './features/books/books-list/books-list';
import { BooksRegister } from './features/books/books-register/books-register';
import { BooksUpdate } from './features/books/books-update/books-update';
import { BooksDetail } from './features/books/books-detail/books-detail';

export const routes: Routes = [
  {path: '', component: Register},
  {path: 'register', component: Register},
  {path: 'login', component: Login},
  {path: 'books', component: BooksList},
  {path: 'create', component: BooksRegister},
  {path: 'edit/:id', component: BooksUpdate},
  {path: 'details/:id', component: BooksDetail},
  {path: '**', redirectTo: ''},
];
