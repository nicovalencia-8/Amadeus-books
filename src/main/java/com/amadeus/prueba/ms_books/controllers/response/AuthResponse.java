package com.amadeus.prueba.ms_books.controllers.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private int statusCode;
    private String status;
    private String message;
    private String accessToken;
    private String refreshToken;
    private Long expiresIn;
}
