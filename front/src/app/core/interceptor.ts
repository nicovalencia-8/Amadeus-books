import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

const EXCLUDED_URLS = [
  '/users/token',
  '/users/create'
];

export function authInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {

  const isExcluded = EXCLUDED_URLS.some(url => req.url.includes(url));
  if (isExcluded) {
    return next(req);
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }
  return next(req);
}
