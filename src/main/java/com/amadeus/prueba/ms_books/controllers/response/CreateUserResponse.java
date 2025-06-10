package com.amadeus.prueba.ms_books.controllers.response;

import com.amadeus.prueba.ms_books.domains.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserResponse {

    private Long userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;

    public CreateUserResponse(User user){
        this.userId = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.username = user.getUsername();
        this.email = user.getEmail();
    }

}
