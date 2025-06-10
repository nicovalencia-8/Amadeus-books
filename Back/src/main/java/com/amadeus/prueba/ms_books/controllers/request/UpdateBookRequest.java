package com.amadeus.prueba.ms_books.controllers.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateBookRequest {

    private String title;
    private String description;
    private String ISBN;
    private Long author;

}
