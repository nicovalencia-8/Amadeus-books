package com.amadeus.prueba.ms_books.domains;

import com.amadeus.prueba.ms_books.controllers.request.CreateBookRequest;
import com.amadeus.prueba.ms_books.domains.commons.SoftEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "books", uniqueConstraints = @UniqueConstraint(columnNames = "ISBN", name = "books_ISBN"))
public class Book extends SoftEntity {

    @NotNull
    private String title;

    @NotNull
    private String description;

    @NotNull
    private String ISBN;

    @NotNull
    private String author;

    public Book(CreateBookRequest bookRequest) {
        this.title = bookRequest.getTitle();
        this.description = bookRequest.getDescription();
        this.ISBN = bookRequest.getISBN();
        this.author = bookRequest.getAuthor();
    }

}
