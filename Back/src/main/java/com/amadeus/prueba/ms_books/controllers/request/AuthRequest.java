package com.amadeus.prueba.ms_books.controllers.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    @NotNull
    private String type;
    private String user;
    private String password;
    private String refreshToken;
    private String token;

}
