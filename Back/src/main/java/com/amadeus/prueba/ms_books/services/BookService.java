package com.amadeus.prueba.ms_books.services;

import com.amadeus.prueba.ms_books.controllers.request.CreateBookRequest;
import com.amadeus.prueba.ms_books.controllers.request.UpdateBookRequest;
import com.amadeus.prueba.ms_books.controllers.response.BookResponse;
import com.amadeus.prueba.ms_books.controllers.response.commons.GeneralResponse;
import com.amadeus.prueba.ms_books.controllers.response.commons.PageResponse;
import com.amadeus.prueba.ms_books.domains.Book;
import com.amadeus.prueba.ms_books.repositories.BookRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public GeneralResponse<BookResponse> createBook(CreateBookRequest bookRequest) {
        Book book = bookRepository.findByISBN(bookRequest.getISBN());
        if (book == null) {
            book = new Book(bookRequest);
            book = bookRepository.save(book);
            BookResponse response = new BookResponse(book);
            return new GeneralResponse<>(
                    HttpStatus.OK.value(),
                    HttpStatus.OK.getReasonPhrase(),
                    "Libro creado correctamente",
                    response
            );
        } else {
            throw new IllegalArgumentException("El libro ya se encuentra registrado");
        }
    }

    public GeneralResponse<BookResponse> getBookById(@Param("id") Long id) {
        Book book = bookRepository.findByIdC(id);
        if (book != null){
            BookResponse response = new BookResponse(book);
            return new GeneralResponse<>(
                    HttpStatus.OK.value(),
                    HttpStatus.OK.getReasonPhrase(),
                    null,
                    response
            );
        } else {
            throw new IllegalArgumentException("Libro no encontrado");
        }
    }

    public GeneralResponse<PageResponse<BookResponse>> getAllBooksByFilter(String title,
                                                          String author,
                                                          String isbn,
                                                          int page,
                                                          int size) {
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Book> pageBook = bookRepository.findAllByFilters(pageRequest, title, author, isbn);
        if (pageBook != null){
            PageResponse<BookResponse> response = new PageResponse<>(pageBook.map(BookResponse::new));
            return new GeneralResponse<>(
                    HttpStatus.OK.value(),
                    HttpStatus.OK.getReasonPhrase(),
                    null,
                    response
            );
        }
        throw new IllegalArgumentException("Libro no encontrado");
    }

    @Transactional
    public GeneralResponse<BookResponse> updateBookById(@Param("id") Long bookId, CreateBookRequest bookRequest) {
        Book book = bookRepository.findByIdC(bookId);
        if (book == null){
            throw new IllegalArgumentException("Libro no encontrado");
        }
        book.setTitle(bookRequest.getTitle());
        book.setDescription(bookRequest.getDescription());
        book.setISBN(bookRequest.getISBN());
        book.setAuthor(book.getAuthor());
        book = bookRepository.save(book);
        BookResponse response = new BookResponse(book);
        return new GeneralResponse<>(
                HttpStatus.OK.value(),
                HttpStatus.OK.getReasonPhrase(),
                "Libro actualizado correctamente",
                response
        );
    }

    @Transactional
    public GeneralResponse<BookResponse> updateBookById(@Param("id") Long bookId, UpdateBookRequest bookRequest) {
        Book book = bookRepository.findByIdC(bookId);
        if (book == null){
            throw new IllegalArgumentException("Libro no encontrado");
        }
        if(bookRequest.getAuthor() != null) book.setAuthor(book.getAuthor());
        if(bookRequest.getTitle() != null) book.setTitle(bookRequest.getTitle());
        if(bookRequest.getDescription() != null) book.setDescription(bookRequest.getDescription());
        if(bookRequest.getISBN() != null) book.setISBN(bookRequest.getISBN());
        book = bookRepository.save(book);
        BookResponse response = new BookResponse(book);
        return new GeneralResponse<>(
                HttpStatus.OK.value(),
                HttpStatus.OK.getReasonPhrase(),
                "Libro actualizado correctamente",
                response
        );
    }

    public GeneralResponse<?> deleteBook(Long bookId) {
        Book book = bookRepository.findByIdC(bookId);
        if (book != null){
            bookRepository.softDelete(bookId);
            return new GeneralResponse<>(
                    HttpStatus.NO_CONTENT.value(),
                    HttpStatus.NO_CONTENT.getReasonPhrase(),
                    "Libro eliminado correctamente",
                    null
            );
        } else {
            throw new IllegalArgumentException("Libro no encontrado");
        }
    }

}
