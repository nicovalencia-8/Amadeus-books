package com.amadeus.prueba.ms_books.repositories;

import com.amadeus.prueba.ms_books.domains.Book;
import com.amadeus.prueba.ms_books.repositories.commons.SoftRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface BookRepository extends SoftRepository<Book> {

    @Query("SELECT b FROM Book b WHERE b.deleted = false AND LOWER(b.ISBN) = LOWER(:isbn)")
    Book findByISBN(@Param("isbn") String isbn);

    @Query("SELECT b FROM Book b " +
            "WHERE b.deleted = false " +
            "AND (COALESCE(:title, '') = '' OR LOWER(b.title) = LOWER(:title)) " +
            "AND (COALESCE(:author, '') = '' OR b.author = :author) " +
            "AND (COALESCE(:isbn, '') = '' OR LOWER(b.ISBN) = LOWER(:isbn)) ")
    Page<Book> findAllByFilters(Pageable pageable,
                             @Param("title") String title,
                             @Param("author") String author,
                             @Param("isbn") String isbn);
}
